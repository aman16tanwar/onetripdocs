# ========================================
# OneTripDocs Backend Dockerfile
# ========================================
#
# 🎓 MENTOR NOTE: Multi-stage Docker Build
# ----------------------------------------
# This Dockerfile uses multi-stage builds:
# 1. Builder stage: Install dependencies
# 2. Runtime stage: Copy only what's needed
#
# Benefits:
# - Smaller final image (no build tools)
# - Faster deployments
# - More secure (less attack surface)

# ========================================
# Stage 1: Builder
# ========================================
FROM python:3.11-slim as builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --user -r requirements.txt


# ========================================
# Stage 2: Runtime
# ========================================
FROM python:3.11-slim as runtime

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/root/.local/bin:$PATH"

WORKDIR /app

# Install runtime dependencies only
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /root/.local /root/.local

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import httpx; httpx.get('http://localhost:8000/api/v1/health')" || exit 1

# Run the application
# 🎓 MENTOR NOTE: In production, you might use gunicorn with uvicorn workers:
# CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000", "app.main:app"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
