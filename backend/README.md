# Madrasha Management Backend API

Backend API for the Madrasha Management System built with Express.js, TypeScript, and MongoDB.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken + bcrypt)
- **Validation**: Zod
- **File Upload**: Multer + AWS S3
- **Security**: helmet, cors, express-rate-limit, express-mongo-sanitize

## Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB (local or Atlas)
- AWS S3 bucket (for file uploads)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env` with your configuration

4. Start development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration (database, env, constants)
│   ├── models/           # Mongoose schemas
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic services
│   ├── middlewares/      # Custom middleware
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── types/            # TypeScript types
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

See `.env.example` for all required environment variables.

## API Documentation

Coming soon...

## License

ISC

