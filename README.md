# OneTripDocs

**One Trip. Done.** — OCI application validation platform.

Stop getting trapped at the BLS counter. Validate your OCI application before you go.

---

## The Problem

65% of OCI applicants face a terrible choice at the BLS counter:
- **Pay $100 NOW** for BLS to "fix" minor issues, OR
- **Rebook in 4+ weeks** (costing $330+ in time, travel, and lost wages)

Most people pay the $100 — not because it's fair, but because rebooking is WORSE.

## The Solution

OneTripDocs validates EVERYTHING before you go:
- ✅ Photocopy quality (AI-powered)
- ✅ Form completion (247 common BLS "findings")
- ✅ Photo specifications
- ✅ Document organization

**Result:** 98% Counter-Proof Score = BLS finds zero issues = One trip. Done.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.11, FastAPI, SQLAlchemy 2.0 |
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **Database** | PostgreSQL 16 (Supabase in production) |
| **AI** | OpenAI / Anthropic (Phase 3) |
| **Deployment** | Docker, Vercel (frontend), Railway/Fly.io (backend) |

---

## Project Structure

```
onetripdocs/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       └── router.py
│   │   ├── core/            # Configuration, security
│   │   ├── db/              # Database connection
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── services/        # Business logic
│   │   └── main.py          # App entry point
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   └── components/      # React components
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml       # Local development
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **Python** 3.11+
- **Docker** (optional, for containerized development)
- **PostgreSQL** 16+ (or use Docker)

### Option 1: Docker (Recommended)

The easiest way to run everything:

```bash
# Clone the repository
git clone https://github.com/your-username/onetripdocs.git
cd onetripdocs

# Start all services
docker-compose up

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000
# - API Docs: http://localhost:8000/docs
```

### Option 2: Manual Setup

#### Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file and configure
cp .env.example .env
# Edit .env with your settings

# Run the server
uvicorn app.main:app --reload --port 8000
```

#### Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Edit .env.local with your settings

# Run the development server
npm run dev
```

#### Database

```bash
# Using Docker (easiest)
docker run -d \
  --name onetripdocs-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=onetripdocs \
  -p 5432:5432 \
  postgres:16-alpine

# Or install PostgreSQL locally and create database
createdb onetripdocs
```

---

## API Endpoints

### Health Check
```
GET /api/v1/health
GET /api/v1/health/ready
```

### Waitlist
```
POST /api/v1/waitlist           # Join waitlist
GET  /api/v1/waitlist/stats     # Public stats (for social proof)
GET  /api/v1/waitlist/verify/{token}  # Verify email
```

### Coming Soon
- `POST /api/v1/users` — User registration
- `POST /api/v1/applications` — Create OCI application
- `POST /api/v1/documents/validate` — Validate document

---

## Development

### Running Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Code Formatting

```bash
# Backend (Python)
black app/
ruff check app/

# Frontend (TypeScript)
npm run lint
npm run format
```

### Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

---

## Environment Variables

### Backend (.env)

```env
# Application
DEBUG=true
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/onetripdocs

# Security
SECRET_KEY=your-secret-key

# AI (Phase 3)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy!

### Backend (Railway/Fly.io)

```bash
# Using Railway
railway login
railway up

# Using Fly.io
fly launch
fly deploy
```

### Database (Supabase)

1. Create a project at supabase.com
2. Copy the connection string
3. Update `DATABASE_URL` in your deployment environment

---

## Roadmap

### Phase 1: Landing + Waitlist ✅
- [x] Landing page with value proposition
- [x] Email capture waitlist
- [x] BLS trap explanation

### Phase 2: Core Validation (In Progress)
- [ ] User authentication
- [ ] Profile questionnaire
- [ ] Personalized document checklist
- [ ] Requirement conflict detector

### Phase 3: Document Validation
- [ ] Photocopy quality validator (AI)
- [ ] Form error pre-checker
- [ ] BLS counter-proof score

### Phase 4: Full Launch
- [ ] Payment integration
- [ ] AI chatbot
- [ ] Community features

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Contact

- **Website:** [onetripdocs.com](https://onetripdocs.com)
- **Email:** hello@onetripdocs.com

---

**Built with frustration, powered by determination.**

*One Trip. Done.* 🚀
