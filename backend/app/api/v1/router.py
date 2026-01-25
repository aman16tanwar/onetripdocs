"""
API V1 Router - Combines all endpoint routers

🎓 MENTOR NOTE: Router Organization
-----------------------------------
FastAPI uses routers to organize endpoints:

1. Each "resource" gets its own router (health, waitlist, users, etc.)
2. This file combines them all with a common prefix
3. main.py includes this router with the API version prefix

Result:
    /api/v1/health
    /api/v1/waitlist
    /api/v1/users (future)
    etc.

This pattern scales well as you add more endpoints.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import health, waitlist

# Create main API router
api_router = APIRouter()

# Include all endpoint routers
# 🎓 MENTOR NOTE: Order doesn't matter for functionality,
# but it affects the order in API documentation

api_router.include_router(
    health.router,
    prefix="",  # No prefix - /api/v1/health
)

api_router.include_router(
    waitlist.router,
    prefix="",  # No prefix - /api/v1/waitlist
)

# Future routers will be added here:
# api_router.include_router(users.router, prefix="")
# api_router.include_router(applications.router, prefix="")
# api_router.include_router(documents.router, prefix="")
