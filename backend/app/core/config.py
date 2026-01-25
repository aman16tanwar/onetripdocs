"""
Application Configuration

🎓 MENTOR NOTE:
---------------
We use Pydantic's BaseSettings to manage configuration. This gives us:
1. Type validation for all settings
2. Automatic loading from environment variables
3. Support for .env files
4. Clear documentation of what config is needed

The pattern: Define defaults here, override via environment variables in production.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    Environment variables take precedence over defaults.
    Use .env file for local development.
    """

    # ========================================
    # Application
    # ========================================
    APP_NAME: str = "OneTripDocs"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"  # development, staging, production

    # ========================================
    # API
    # ========================================
    API_V1_PREFIX: str = "/api/v1"

    # CORS - Which domains can call our API
    # In production, this should be your frontend domain only
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",      # Next.js dev server
        "http://127.0.0.1:3000",
        "http://localhost:8000",      # FastAPI docs
    ]

    # ========================================
    # Database (Supabase PostgreSQL)
    # ========================================
    # Format: postgresql+asyncpg://user:password@host:port/database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/onetripdocs"

    # Connection pool settings
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10

    # ========================================
    # Security
    # ========================================
    SECRET_KEY: str = "your-secret-key-change-in-production"  # For JWT signing
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    # ========================================
    # AI Services (Phase 3)
    # ========================================
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None

    # ========================================
    # External Services
    # ========================================
    # Supabase (if using their client SDK)
    SUPABASE_URL: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None

    # ========================================
    # Pydantic Settings Config
    # ========================================
    model_config = SettingsConfigDict(
        env_file=".env",           # Load from .env file
        env_file_encoding="utf-8",
        case_sensitive=True,        # ENV vars are case-sensitive
        extra="ignore",             # Ignore extra env vars
    )


# 🎓 MENTOR NOTE: @lru_cache ensures we only create Settings once
# This is a common pattern called "singleton" - one instance for the whole app
@lru_cache
def get_settings() -> Settings:
    """
    Get cached settings instance.

    Using lru_cache means this function only runs once,
    then returns the same Settings object every time.
    """
    return Settings()


# Convenience: Create a settings instance for direct import
settings = get_settings()
