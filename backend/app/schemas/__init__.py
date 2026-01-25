# Pydantic Schemas (API Request/Response Validation)
# These define how data is transferred via the API

from app.schemas.waitlist import (
    WaitlistCreate,
    WaitlistResponse,
    WaitlistStats,
)

__all__ = [
    "WaitlistCreate",
    "WaitlistResponse",
    "WaitlistStats",
]
