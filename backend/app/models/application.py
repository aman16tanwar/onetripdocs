"""
Application Model - OCI Application Tracking

🎓 MENTOR NOTE: Domain Modeling
-------------------------------
An OCI Application represents a user's attempt to apply for OCI.
It tracks:
- Application type (Type A, B, C, etc.)
- User's personal situation (for checklist generation)
- Progress through the process
- BLS Counter-Proof Score

This is the CORE entity of the business domain.
"""

from datetime import datetime
from enum import Enum
from sqlalchemy import String, DateTime, Boolean, Text, Integer, Float, ForeignKey, Enum as SQLEnum, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSONB
from typing import Optional, TYPE_CHECKING

from app.db.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.document import Document


class ApplicationType(str, Enum):
    """OCI Application Types based on eligibility"""
    TYPE_A = "TYPE_A"  # Former Indian citizen
    TYPE_B = "TYPE_B"  # Person of Indian Origin (parent/grandparent)
    TYPE_C = "TYPE_C"  # Spouse of Indian citizen/OCI
    TYPE_D = "TYPE_D"  # Minor child of OCI holder
    REISSUE = "REISSUE"  # Existing OCI holder (reissue)


class ApplicationStatus(str, Enum):
    """Application lifecycle status"""
    DRAFT = "DRAFT"                    # Started but not complete
    CHECKLIST_READY = "CHECKLIST_READY"  # Checklist generated
    VALIDATING = "VALIDATING"          # Documents being validated
    READY_FOR_BLS = "READY_FOR_BLS"    # All validated, ready to submit
    SUBMITTED = "SUBMITTED"            # Submitted to BLS
    PROCESSING = "PROCESSING"          # Being processed by consulate
    APPROVED = "APPROVED"              # OCI approved!
    REJECTED = "REJECTED"              # Rejected (can resubmit)


class MaritalStatus(str, Enum):
    SINGLE = "SINGLE"
    MARRIED = "MARRIED"
    DIVORCED = "DIVORCED"
    WIDOWED = "WIDOWED"


class Application(Base):
    """
    OCI Application - the core business entity.

    🎓 MENTOR NOTE: JSONB for Flexible Data
    ---------------------------------------
    We use JSONB (PostgreSQL JSON Binary) for questionnaire_answers.
    This allows flexible schema for the questionnaire without
    creating a new column for each question.

    Pros: Flexible, no migrations for new questions
    Cons: Can't easily query/index individual answers
    """

    __tablename__ = "applications"

    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Foreign Key to User
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Application Identification
    reference_number: Mapped[Optional[str]] = mapped_column(
        String(50),
        unique=True,
        nullable=True,
        index=True,
    )  # e.g., "CANV007E5N26" - assigned after questionnaire

    # Application Type & Status
    application_type: Mapped[Optional[ApplicationType]] = mapped_column(
        SQLEnum(ApplicationType),
        nullable=True,  # Set after questionnaire
    )
    status: Mapped[ApplicationStatus] = mapped_column(
        SQLEnum(ApplicationStatus),
        default=ApplicationStatus.DRAFT,
        nullable=False,
    )

    # ========================================
    # Applicant Profile (from questionnaire)
    # ========================================
    # Basic Info
    full_name: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    date_of_birth: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    is_minor: Mapped[bool] = mapped_column(Boolean, default=False)

    # Current Status
    current_nationality: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    marital_status: Mapped[Optional[MaritalStatus]] = mapped_column(
        SQLEnum(MaritalStatus),
        nullable=True,
    )
    is_employed: Mapped[bool] = mapped_column(Boolean, default=False)

    # Indian Connection
    was_indian_citizen: Mapped[bool] = mapped_column(Boolean, default=False)
    has_indian_parent: Mapped[bool] = mapped_column(Boolean, default=False)
    has_indian_spouse: Mapped[bool] = mapped_column(Boolean, default=False)

    # Submission Details
    jurisdiction: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # e.g., "Vancouver, BC"
    consulate: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Flexible questionnaire answers (JSONB)
    questionnaire_answers: Mapped[Optional[dict]] = mapped_column(
        JSONB,
        nullable=True,
        default=dict,
    )

    # ========================================
    # Validation & Counter-Proof Score
    # ========================================
    counter_proof_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)  # 0-100
    photocopy_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    form_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    photo_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    organization_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    last_validated_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # ========================================
    # BLS Submission
    # ========================================
    submitted_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    bls_appointment_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Outcome tracking (for community data)
    bls_extra_fee_paid: Mapped[Optional[float]] = mapped_column(Float, nullable=True)  # If they had to pay extra
    bls_issues_found: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # What issues BLS found
    outcome_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # ========================================
    # Timestamps
    # ========================================
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

    # ========================================
    # Relationships
    # ========================================
    user: Mapped["User"] = relationship("User", back_populates="applications")
    documents: Mapped[list["Document"]] = relationship(
        "Document",
        back_populates="application",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Application(id={self.id}, type={self.application_type}, status={self.status})>"
