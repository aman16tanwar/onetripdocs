"""
OneTripDocs API - Main Application Entry Point

🎓 MENTOR NOTE: FastAPI Application Structure
---------------------------------------------
This is the entry point for the entire backend. It:
1. Creates the FastAPI application instance
2. Configures middleware (CORS, etc.)
3. Includes all routers (endpoints)
4. Sets up startup/shutdown events

To run:
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

The --reload flag enables hot reloading during development.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import structlog

from app.core.config import settings
from app.api.v1.router import api_router
from app.db.database import init_db, close_db

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
)

logger = structlog.get_logger()


# ========================================
# Application Lifespan (Startup/Shutdown)
# ========================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.

    🎓 MENTOR NOTE: Lifespan Events
    -------------------------------
    This is the modern way to handle startup/shutdown in FastAPI.
    The old @app.on_event("startup") is deprecated.

    What happens:
    1. Code before `yield` runs on startup
    2. Application runs and handles requests
    3. Code after `yield` runs on shutdown

    Common use cases:
    - Startup: Connect to DB, load ML models, warm caches
    - Shutdown: Close connections, save state, cleanup
    """
    # === STARTUP ===
    logger.info(
        "Starting OneTripDocs API",
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
    )

    # Initialize database tables (development only)
    # In production, use Alembic migrations instead
    if settings.ENVIRONMENT == "development":
        try:
            await init_db()
            logger.info("Database tables initialized")
        except Exception as e:
            logger.error("Failed to initialize database", error=str(e))
            # Don't fail startup - DB might not be ready yet

    yield  # Application runs here

    # === SHUTDOWN ===
    logger.info("Shutting down OneTripDocs API")
    await close_db()


# ========================================
# Create FastAPI Application
# ========================================

app = FastAPI(
    title=settings.APP_NAME,
    description="""
    ## OneTripDocs API

    **One Trip. Done.** - OCI application validation platform.

    This API powers the OneTripDocs platform, helping OCI applicants:
    - Get personalized document checklists
    - Validate documents before visiting BLS
    - Avoid the BLS counter trap ($100 fee or 4-week rebook)

    ### Features (MVP)
    - **Waitlist**: Join early access waitlist
    - **Health**: System health checks

    ### Coming Soon
    - User authentication
    - Profile questionnaire
    - Document validation
    - AI-powered assistance
    """,
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DEBUG else None,  # Disable docs in production
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan,
)


# ========================================
# Middleware Configuration
# ========================================

# 🎓 MENTOR NOTE: CORS (Cross-Origin Resource Sharing)
# ---------------------------------------------------
# Browsers block requests from one domain to another by default.
# CORS middleware tells browsers "these origins are allowed to call me."
#
# In development: Allow localhost:3000 (Next.js)
# In production: Only allow your actual domain

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# ========================================
# Include Routers
# ========================================

# Mount API v1 router with prefix
app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,  # /api/v1
)


# ========================================
# Root Endpoint
# ========================================

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - basic info about the API.

    🎓 MENTOR NOTE: This is useful for:
    - Quick check that server is running
    - Providing API info to developers
    - SEO if the API URL is visited directly
    """
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs" if settings.DEBUG else "Disabled in production",
        "health": f"{settings.API_V1_PREFIX}/health",
        "message": "One Trip. Done. 🚀",
    }


# ========================================
# Development Entry Point
# ========================================

if __name__ == "__main__":
    import uvicorn

    # 🎓 MENTOR NOTE: This allows running with `python app/main.py`
    # In production, use: uvicorn app.main:app
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
    )
