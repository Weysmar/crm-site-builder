# CRM Site Builder

A comprehensive CRM and Portfolio Site Builder platform connected to a high-performance Astro generator.

## Project Structure

- **api/**: NestJS Backend (CRM Core, Database, API)
- **admin/**: Next.js Frontend (Admin Dashboard, Visual Builder)
- **generator/**: Astro Static Site Generator
- **docker-compose.yml**: Deployment orchestration

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### 1. Launch Infrastructure
Start PostgreSQL and Redis:
```bash
docker compose up -d postgres redis
```

### 2. Setup Backend (API)
```bash
cd api
npm install
# Create .env from .env.example
cp .env.example .env
# Run migrations
npx prisma migrate dev --name init
# Start server
npm run start:dev
```

### 3. Setup Frontend (Admin)
```bash
cd admin
npm install
# Create .env from .env.example
cp .env.example .env
# Start server
npm run dev
```

### 4. Setup Generator
```bash
cd generator
npm install
```

## Deployment

The project is configured for **Dokploy**.
1. Push to GitHub.
2. Connect repository in Dokploy.
3. Use `docker-compose.yml` for orchestration.
