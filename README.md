# GiftLink

GiftLink is a full-stack web application for sharing household items that people no longer need.

## Stack
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Containerization: Docker
- CI: GitHub Actions

## Project structure

```text
GiftLink/
├── backend/
├── frontend/
├── docs/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

## Local setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set `MONGO_URI` and `JWT_SECRET` in `.env`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend expects the API at `http://localhost:5000/api`.

## API endpoints

- `GET /api/gifts`
- `GET /api/gifts/:id`
- `POST /api/gifts`
- `PUT /api/gifts/:id`
- `DELETE /api/gifts/:id`
- `GET /api/search?category=Furniture`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `PUT /api/auth/profile`

## Important

Do not commit `.env` or real credentials. Create your own MongoDB Atlas database and JWT secret.
