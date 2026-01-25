"""
Document Model - Uploaded Document Tracking

🎓 MENTOR NOTE: Document Validation is Our Core Value
-----------------------------------------------------
This model tracks:
1. Which documents the user has uploaded
2. Validation results (photocopy quality, etc.)
3. Whether it meets BLS requirements

The validation_result JSONB stores AI analysis results.
"""

from datetime import datetime
from enum import Enum
from sqlalchemy import String, DateTime, Boolean, Text, Integer, Float, ForeignKey, Enum as SQLEnum, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSONB
from typing import Optional, TYPE_CHECKING

from app.db.database import Base

if TYPE_CHECKING:
    from app.models.application import Application


class DocumentType(str, Enum):
    """Types of documents required for OCI application"""
    # Identity Documents
    CURRENT_PASSPORT = "CURRENT_PASSPORT"
    PREVIOUS_PASSPORT = "PREVIOUS_PASSPORT"
    INDIAN_PASSPORT = "INDIAN_PASSPORT"
    SURRENDER_CERTIFICATE = "SURRENDER_CERTIFICATE"

    # Civil Documents
    BIRTH_CERTIFICATE = "BIRTH_CERTIFICATE"
    MARRIAGE_CERTIFICATE = "MARRIAGE_CERTIFICATE"
    DIVORCE_DECREE = "DIVORCE_DECREE"
    DEATH_CERTIFICATE = "DEATH_CERTIFICATE"

    # Proof Documents
    PROOF_OF_ADDRESS = "PROOF_OF_ADDRESS"
    EMPLOYMENT_LETTER = "EMPLOYMENT_LETTER"

    # Photos
    PASSPORT_PHOTO = "PASSPORT_PHOTO"

    # OCI Specific
    OCI_APPLICATION_FORM = "OCI_APPLICATION_FORM"
    OCI_CARD_COPY = "OCI_CARD_COPY"  # For reissue

    # Supporting Documents
    PARENT_INDIAN_PASSPORT = "PARENT_INDIAN_PASSPORT"
    GRANDPARENT_INDIAN_PASSPORT = "GRANDPARENT_INDIAN_PASSPORT"
    SPOUSE_INDIAN_PASSPORT = "SPOUSE_INDIAN_PASSPORT"
    CHILD_BIRTH_CERTIFICATE = "CHILD_BIRTH_CERTIFICATE"

    # Other
    OTHER = "OTHER"


class DocumentStatus(str, Enum):
    """Document validation status"""
    PENDING = "PENDING"          # Not yet uploaded
    UPLOADED = "UPLOADED"        # Uploaded, not validated
    VALIDATING = "VALIDATING"    # AI validation in progress
    PASSED = "PASSED"            # Meets all requirements
    FAILED = "FAILED"            # Has issues that need fixing
    NEEDS_REVIEW = "NEEDS_REVIEW"  # AI uncertain, needs human review


class Document(Base):
    """
    Document tracking and validation.

    🎓 MENTOR NOTE: File Storage Strategy
    -------------------------------------
    We don't store files in the database - just metadata.
    Options for file storage:
    1. Supabase Storage (easiest with Supabase)
    2. AWS S3
    3. Cloudflare R2
    4. Local filesystem (development only)

    The file_path stores the path/key in your storage system.
    """

    __tablename__ = "documents"

    # Primary Key
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Foreign Key to Application
    application_id: Mapped[int] = mapped_column(
        ForeignKey("applications.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Document Identification
    document_type: Mapped[DocumentType] = mapped_column(
        SQLEnum(DocumentType),
        nullable=False,
    )
    status: Mapped[DocumentStatus] = mapped_column(
        SQLEnum(DocumentStatus),
        default=DocumentStatus.PENDING,
        nullable=False,
    )

    # File Information
    file_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    file_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)  # S3/storage path
    file_size: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # bytes
    file_type: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)  # MIME type
    file_hash: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)  # SHA256 for dedup

    # ========================================
    # Validation Results
    # ========================================
    # Overall validation
    is_valid: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)
    validation_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)  # 0-100

    # Detailed AI validation results (JSONB)
    # Example structure:
    # {
    #   "photocopy_quality": { "score": 95, "issues": [] },
    #   "readability": { "score": 100, "issues": [] },
    #   "completeness": { "score": 90, "issues": ["Missing signature"] },
    #   "bls_compliance": { "score": 98, "issues": [] }
    # }
    validation_result: Mapped[Optional[dict]] = mapped_column(
        JSONB,
        nullable=True,
        default=dict,
    )

    # Specific validation scores (for filtering/querying)
    clarity_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    contrast_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    brightness_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    completeness_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    # Issues found (human-readable)
    issues_found: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    suggestions: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # ========================================
    # Timestamps
    # ========================================
    uploaded_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    validated_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
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
    application: Mapped["Application"] = relationship("Application", back_populates="documents")

    def __repr__(self) -> str:
        return f"<Document(id={self.id}, type={self.document_type}, status={self.status})>"
