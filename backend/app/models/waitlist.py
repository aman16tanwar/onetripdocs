"""
Waitlist Model - Database Table Definition

🎓 MENTOR NOTE: Models vs Schemas
---------------------------------
This is a MODEL (SQLAlchemy) - it defines the DATABASE TABLE structure.

Models answer: "How is data STORED?"
Schemas answer: "How is data TRANSFERRED via API?"

They're often similar but serve different purposes:
- Models have database-specific things (indexes, constraints)
- Schemas have API-specific things (validation rules, examples)
"""

from datetime import datetime
from sqlalchemy import String, DateTime, Boolean, Text, func
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional

from app.db.database import Base


class WaitlistEntry(Base):
    """
    Waitlist signup - captures early interest before full launch.

    🎓 MENTOR NOTE: SQLAlchemy 2.0 Mapped Columns
    ---------------------------------------------
    The new syntax uses type hints:
        id: Mapped[int] = mapped_column(primary_key=True)

    This replaces the old:
        id = Column(Integer, primary_key=True)

    Benefits:
    - Better type checking
    - IDE autocompletion works
    - Clearer code
    """

    __tablename__ = "waitlist_entries"

    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Core Fields
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,       # No duplicate emails
        nullable=False,
        index=True,        # Fast lookups by email
    )

    # Optional: Name for personalization
    name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Source tracking (where did they sign up from?)
    source: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
        default="landing_page"
    )
    # Examples: "landing_page", "reddit", "facebook", "referral"

    # UTM tracking for marketing
    utm_source: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # User's situation (for prioritization)
    applying_soon: Mapped[bool] = mapped_column(Boolean, default=False)
    # True if they're planning to apply within 3 months

    # Notes (any additional info they provided)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Email status
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    verification_token: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Timestamps
    # 🎓 MENTOR NOTE: server_default=func.now() runs at DB level
    # This is more reliable than Python datetime for distributed systems
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),  # Auto-update on any change
        nullable=False
    )

    def __repr__(self) -> str:
        return f"<WaitlistEntry(id={self.id}, email='{self.email}')>"
