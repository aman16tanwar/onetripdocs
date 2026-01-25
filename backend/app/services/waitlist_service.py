"""
Waitlist Service - Business Logic

🎓 MENTOR NOTE: Why a Service Layer?
------------------------------------
The service layer separates business logic from:
1. HTTP handling (API routes)
2. Database operations (models)

Benefits:
- Easier to test (can test logic without HTTP)
- Reusable (can call from CLI, background jobs, etc.)
- Cleaner routes (thin controllers)

Pattern:
    Route → Service → Database
    Route receives request, validates, calls service
    Service contains business logic
    Database handles persistence
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
from typing import Optional
import secrets

from app.models.waitlist import WaitlistEntry
from app.schemas.waitlist import WaitlistCreate, WaitlistResponse, WaitlistConfirmation, WaitlistStats


class WaitlistService:
    """
    Service for waitlist operations.

    🎓 MENTOR NOTE: Class-based vs Function-based Services
    ------------------------------------------------------
    I'm using a class here because it groups related operations.
    You could also use standalone functions. Both are valid.

    Class benefits:
    - Groups related functions
    - Can hold shared state if needed
    - Easier to mock in tests

    Function benefits:
    - Simpler
    - No instantiation needed
    - More functional style
    """

    @staticmethod
    async def create_entry(
        db: AsyncSession,
        data: WaitlistCreate
    ) -> WaitlistConfirmation:
        """
        Add a new email to the waitlist.

        Returns:
            WaitlistConfirmation with position number

        Raises:
            ValueError: If email already exists
        """
        # Check if email already exists
        existing = await WaitlistService.get_by_email(db, data.email)
        if existing:
            raise ValueError("Email already registered")

        # Generate verification token
        verification_token = secrets.token_urlsafe(32)

        # Create new entry
        entry = WaitlistEntry(
            email=data.email,
            name=data.name,
            source=data.source,
            utm_source=data.utm_source,
            utm_medium=data.utm_medium,
            utm_campaign=data.utm_campaign,
            applying_soon=data.applying_soon,
            notes=data.notes,
            verification_token=verification_token,
        )

        db.add(entry)

        try:
            await db.flush()  # Get the ID without committing
        except IntegrityError:
            await db.rollback()
            raise ValueError("Email already registered")

        # Calculate position (how many people signed up before them + 1)
        position = await WaitlistService.get_position(db, entry.id)

        return WaitlistConfirmation(
            success=True,
            message="You're on the list! We'll notify you when we launch.",
            position=position,
            email=entry.email,
        )

    @staticmethod
    async def get_by_email(
        db: AsyncSession,
        email: str
    ) -> Optional[WaitlistEntry]:
        """
        Find a waitlist entry by email.

        🎓 MENTOR NOTE: SQLAlchemy 2.0 Query Syntax
        ------------------------------------------
        The new style uses select() instead of query():

        Old: db.query(WaitlistEntry).filter(...).first()
        New: await db.execute(select(WaitlistEntry).where(...))

        The new style is more explicit and works better with async.
        """
        result = await db.execute(
            select(WaitlistEntry).where(WaitlistEntry.email == email)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_position(db: AsyncSession, entry_id: int) -> int:
        """
        Get waitlist position for an entry.

        Position = number of entries created before this one + 1
        """
        result = await db.execute(
            select(func.count(WaitlistEntry.id)).where(
                WaitlistEntry.id <= entry_id
            )
        )
        return result.scalar() or 1

    @staticmethod
    async def get_stats(db: AsyncSession) -> WaitlistStats:
        """
        Get public waitlist statistics for social proof.

        🎓 MENTOR NOTE: What to expose publicly
        --------------------------------------
        Be careful about what stats you expose:
        ✅ Total count (social proof)
        ✅ Today's signups (momentum)
        ❌ Individual emails (privacy!)
        ❌ Detailed breakdown (competitive info)
        """
        # Total signups
        total_result = await db.execute(
            select(func.count(WaitlistEntry.id))
        )
        total = total_result.scalar() or 0

        # Signups in last 24 hours
        yesterday = datetime.utcnow() - timedelta(days=1)
        today_result = await db.execute(
            select(func.count(WaitlistEntry.id)).where(
                WaitlistEntry.created_at >= yesterday
            )
        )
        today = today_result.scalar() or 0

        return WaitlistStats(
            total_signups=total,
            signups_today=today,
        )

    @staticmethod
    async def verify_email(
        db: AsyncSession,
        token: str
    ) -> bool:
        """
        Verify email using token.

        Returns True if verification successful.
        """
        result = await db.execute(
            select(WaitlistEntry).where(
                WaitlistEntry.verification_token == token
            )
        )
        entry = result.scalar_one_or_none()

        if not entry:
            return False

        entry.email_verified = True
        entry.verification_token = None  # Clear token after use

        return True
