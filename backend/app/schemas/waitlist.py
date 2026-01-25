"""
Waitlist Schemas - API Request/Response Validation

🎓 MENTOR NOTE: Why Pydantic Schemas?
-------------------------------------
Pydantic does automatic validation:
1. Type checking (is email a string?)
2. Format validation (is it a valid email?)
3. Required vs optional fields
4. Default values
5. Automatic API documentation

The pattern:
- Create schema: What client sends to create a record
- Response schema: What server returns
- Update schema: What client sends to update (usually partial)
"""

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# ========================================
# Request Schemas (What client sends)
# ========================================

class WaitlistCreate(BaseModel):
    """
    Schema for creating a new waitlist entry.

    🎓 MENTOR NOTE: Validation Examples
    -----------------------------------
    - EmailStr: Validates email format automatically
    - Field(...): Required field (no default)
    - Field(default=None): Optional field
    - Field(max_length=100): Constraint

    FastAPI will return 422 Unprocessable Entity if validation fails,
    with detailed error messages.
    """

    email: EmailStr = Field(
        ...,  # Required
        description="Email address for waitlist signup",
        examples=["user@example.com"]
    )

    name: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Optional name for personalization",
        examples=["Aman"]
    )

    source: Optional[str] = Field(
        default="landing_page",
        max_length=50,
        description="Where the signup came from",
        examples=["landing_page", "reddit", "facebook"]
    )

    # UTM parameters for marketing attribution
    utm_source: Optional[str] = Field(default=None, max_length=100)
    utm_medium: Optional[str] = Field(default=None, max_length=100)
    utm_campaign: Optional[str] = Field(default=None, max_length=100)

    applying_soon: bool = Field(
        default=False,
        description="Is the user planning to apply within 3 months?"
    )

    notes: Optional[str] = Field(
        default=None,
        max_length=500,
        description="Any additional notes from the user"
    )


# ========================================
# Response Schemas (What server returns)
# ========================================

class WaitlistResponse(BaseModel):
    """
    Schema for returning a waitlist entry.

    🎓 MENTOR NOTE: model_config with from_attributes
    ------------------------------------------------
    Setting from_attributes=True allows Pydantic to read
    from SQLAlchemy model attributes directly:

        entry = db.query(WaitlistEntry).first()
        return WaitlistResponse.model_validate(entry)

    This bridges the gap between Models and Schemas.
    """

    id: int
    email: EmailStr
    name: Optional[str] = None
    source: Optional[str] = None
    applying_soon: bool
    created_at: datetime
    position: Optional[int] = None  # Position in waitlist (calculated)

    model_config = {
        "from_attributes": True,  # Allow reading from ORM models
    }


class WaitlistConfirmation(BaseModel):
    """
    Response after successful waitlist signup.
    """
    success: bool = True
    message: str = "You're on the list!"
    position: int = Field(
        ...,
        description="Your position in the waitlist",
        examples=[42]
    )
    email: EmailStr


class WaitlistStats(BaseModel):
    """
    Public waitlist statistics for social proof.

    🎓 MENTOR NOTE: Social Proof
    ----------------------------
    Showing "Join 1,234 others on the waitlist" increases
    conversion. People trust what others are doing.
    """
    total_signups: int = Field(
        ...,
        description="Total number of people on waitlist",
        examples=[1234]
    )
    signups_today: int = Field(
        default=0,
        description="New signups in last 24 hours"
    )
    # Don't expose too much - just enough for social proof


# ========================================
# Error Schemas
# ========================================

class WaitlistError(BaseModel):
    """
    Error response for waitlist operations.
    """
    detail: str = Field(
        ...,
        description="Error message",
        examples=["Email already registered"]
    )
