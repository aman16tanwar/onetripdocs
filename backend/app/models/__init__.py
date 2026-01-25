# Database Models (SQLAlchemy ORM)
# These define how data is stored in PostgreSQL
#
# 🎓 MENTOR NOTE: Import Order Matters
# ------------------------------------
# Import models in order of dependencies:
# 1. Base models (no foreign keys)
# 2. Models that depend on #1
# 3. Models that depend on #2
#
# This prevents circular import issues.

from app.models.waitlist import WaitlistEntry
from app.models.user import User
from app.models.application import Application, ApplicationType, ApplicationStatus, MaritalStatus
from app.models.document import Document, DocumentType, DocumentStatus

__all__ = [
    # Waitlist (standalone)
    "WaitlistEntry",

    # User
    "User",

    # Application
    "Application",
    "ApplicationType",
    "ApplicationStatus",
    "MaritalStatus",

    # Document
    "Document",
    "DocumentType",
    "DocumentStatus",
]
