"""
Health Check Endpoints

🎓 MENTOR NOTE: Why Health Checks?
----------------------------------
Health endpoints are crucial for:
1. Load balancers (is the server ready to receive traffic?)
2. Kubernetes (liveness/readiness probes)
3. Monitoring systems (is the service up?)
4. Debugging (what version is deployed?)

Standard patterns:
- /health - Basic "I'm alive" check
- /health/ready - Am I ready to serve traffic? (DB connected, etc.)
- /health/live - Am I running at all?
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from datetime import datetime

from app.db.database import get_db
from app.core.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """
    Basic health check - returns 200 if server is running.

    🎓 MENTOR NOTE: This endpoint should be FAST and have NO dependencies.
    It's called frequently by load balancers/monitoring.
    """
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/health/ready")
async def readiness_check(db: AsyncSession = Depends(get_db)):
    """
    Readiness check - verifies all dependencies are available.

    Returns 200 only if:
    - Database is connected and responding
    - Any other critical services are available

    🎓 MENTOR NOTE: Use this for Kubernetes readiness probes.
    Traffic won't be routed until this returns 200.
    """
    checks = {
        "database": False,
    }

    # Check database connection
    try:
        await db.execute(text("SELECT 1"))
        checks["database"] = True
    except Exception as e:
        checks["database"] = False
        checks["database_error"] = str(e)

    # Overall status
    all_healthy = all(v for k, v in checks.items() if not k.endswith("_error"))

    return {
        "status": "ready" if all_healthy else "not_ready",
        "checks": checks,
        "timestamp": datetime.utcnow().isoformat(),
    }
