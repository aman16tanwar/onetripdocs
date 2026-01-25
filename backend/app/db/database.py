"""
Database Connection & Session Management

🎓 MENTOR NOTE: Understanding SQLAlchemy Async
----------------------------------------------
SQLAlchemy 2.0 supports async/await, which is crucial for FastAPI performance.

Key concepts:
1. Engine: The connection to the database
2. Session: A "workspace" for database operations
3. Base: Parent class for all our database models

The pattern we use:
- create_async_engine() - Creates connection pool
- async_sessionmaker() - Factory for creating sessions
- get_db() - Dependency that provides a session to each request

Why async?
- FastAPI is async by default
- Async DB operations don't block other requests
- Better performance under load
"""

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool
from typing import AsyncGenerator

from app.core.config import settings


# ========================================
# Database Engine
# ========================================

# 🎓 MENTOR NOTE: Engine configuration matters for production
# - pool_size: How many connections to keep open
# - max_overflow: Extra connections allowed when pool is full
# - echo: Set to True to see SQL queries (useful for debugging)

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,  # Log SQL queries in debug mode
    pool_size=settings.DB_POOL_SIZE,
    max_overflow=settings.DB_MAX_OVERFLOW,
    # For production with Supabase, you might want:
    # poolclass=NullPool  # Let Supabase handle pooling
)


# ========================================
# Session Factory
# ========================================

# 🎓 MENTOR NOTE: async_sessionmaker creates session instances
# - expire_on_commit=False: Objects remain accessible after commit
# - class_=AsyncSession: Use async session class

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


# ========================================
# Base Model Class
# ========================================

class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy models.

    All your models will inherit from this:
        class User(Base):
            __tablename__ = "users"
            ...

    🎓 MENTOR NOTE: DeclarativeBase (SQLAlchemy 2.0+) replaces
    the old declarative_base() function. It provides:
    - Type hints support
    - Better IDE integration
    - Cleaner syntax
    """
    pass


# ========================================
# Dependency: Get Database Session
# ========================================

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency that provides a database session.

    Usage in endpoints:
        @router.get("/items")
        async def get_items(db: AsyncSession = Depends(get_db)):
            ...

    🎓 MENTOR NOTE: This is the "Dependency Injection" pattern
    --------------------------------------------------------
    - FastAPI calls this function for each request that needs DB
    - The `yield` makes this a context manager
    - Session is automatically closed after the request
    - If an error occurs, changes are rolled back

    This ensures:
    1. Each request gets a fresh session
    2. Sessions are properly closed (no connection leaks)
    3. Failed operations don't corrupt data
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# ========================================
# Database Initialization
# ========================================

async def init_db() -> None:
    """
    Initialize database tables.

    🎓 MENTOR NOTE: This creates all tables defined in your models.
    In production, you'd use Alembic migrations instead.
    This is useful for development/testing.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def close_db() -> None:
    """
    Close database connections.

    Called during application shutdown.
    """
    await engine.dispose()
