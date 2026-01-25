"""
User Model - Database Table Definition

🎓 MENTOR NOTE: User Authentication Models
------------------------------------------
Users are the foundation of most applications. Key considerations:
1. Never store plain text passwords (use hashing)
2. Email should be unique and verified
3. Track when users were created/last active
4. Consider soft deletes (is_active) vs hard deletes
"""

from datetime import datetime
from sqlalchemy import String, DateTime, Boolean, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, TYPE_CHECKING

from app.db.database import Base

# 🎓 MENTOR NOTE: TYPE_CHECKING avoids circular imports
# This import only happens during type checking, not at runtime
if TYPE_CHECKING:
    from app.models.application import Application


class User(Base):
    """
    User account for the platform.

    Users can:
    - Sign up and manage their profile
    - Create OCI applications
    - Upload and validate documents
    """

    __tablename__ = "users"

    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Authentication
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)

    # Profile
    full_name: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)

    # Account Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_premium: Mapped[bool] = mapped_column(Boolean, default=False)

    # Email verification
    verification_token: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    verified_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Password reset
    password_reset_token: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    password_reset_expires: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Premium/Payment
    premium_until: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    stripe_customer_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    # 🎓 MENTOR NOTE: back_populates creates bidirectional relationship
    # User.applications ↔ Application.user
    applications: Mapped[list["Application"]] = relationship(
        "Application",
        back_populates="user",
        cascade="all, delete-orphan"  # Delete applications when user is deleted
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}')>"
