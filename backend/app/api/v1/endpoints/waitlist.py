"""
Waitlist API Endpoints

🎓 MENTOR NOTE: RESTful API Design
----------------------------------
REST principles for this resource:

POST   /waitlist      - Create (signup)
GET    /waitlist/stats - Read (public stats for social proof)
GET    /waitlist/{id} - Read one (would need auth - not implemented yet)

We're NOT implementing:
- GET /waitlist (list all) - Privacy concern, needs admin auth
- DELETE /waitlist/{id} - Unsubscribe (future feature)
- PUT /waitlist/{id} - Update (future feature)

Start minimal, add as needed!
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.schemas.waitlist import (
    WaitlistCreate,
    WaitlistConfirmation,
    WaitlistStats,
)
from app.services.waitlist_service import WaitlistService

router = APIRouter(prefix="/waitlist", tags=["Waitlist"])


@router.post(
    "",
    response_model=WaitlistConfirmation,
    status_code=status.HTTP_201_CREATED,
    summary="Join the waitlist",
    description="Add your email to be notified when OneTripDocs launches.",
)
async def create_waitlist_entry(
    data: WaitlistCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Sign up for the waitlist.

    🎓 MENTOR NOTE: Error Handling Pattern
    -------------------------------------
    - Service raises ValueError for business logic errors
    - Route catches and converts to HTTPException
    - This keeps services clean of HTTP concerns

    Why 201 Created?
    - REST convention: POST that creates returns 201
    - 200 OK is for operations that don't create resources
    """
    try:
        result = await WaitlistService.create_entry(db, data)
        return result
    except ValueError as e:
        # Email already exists
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e),
        )


@router.get(
    "/stats",
    response_model=WaitlistStats,
    summary="Get waitlist statistics",
    description="Public statistics for social proof (total signups, etc.)",
)
async def get_waitlist_stats(
    db: AsyncSession = Depends(get_db),
):
    """
    Get public waitlist statistics.

    🎓 MENTOR NOTE: No authentication needed here
    This endpoint is intentionally public for social proof on landing page.
    "Join 1,234 others on the waitlist!"
    """
    return await WaitlistService.get_stats(db)


@router.get(
    "/verify/{token}",
    summary="Verify email address",
    description="Verify email using the token sent via email.",
)
async def verify_email(
    token: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Verify email address using token.

    🎓 MENTOR NOTE: Email Verification Flow
    --------------------------------------
    1. User signs up → we create verification_token
    2. We send email with link: /verify/{token}
    3. User clicks link → this endpoint validates token
    4. Token is consumed (set to null) - single use

    This prevents:
    - Fake signups with invalid emails
    - Spam/abuse of the waitlist
    """
    success = await WaitlistService.verify_email(db, token)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid or expired verification token",
        )

    return {
        "success": True,
        "message": "Email verified successfully!",
    }
