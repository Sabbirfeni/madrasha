# Madrasha Management Backend API

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files (db, env, constants)
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── constants.ts
│   │
│   ├── models/           # Mongoose schemas
│   │   ├── admin/
│   │   │   ├── admin.model.ts
│   │   │   └── types.ts
│   │   ├── student/
│   │   │   ├── student.model.ts
│   │   │   └── types.ts
│   │   ├── employee/
│   │   │   ├── employee.model.ts
│   │   │   └── types.ts
│   │   ├── donation/
│   │   │   ├── donation.model.ts
│   │   │   └── types.ts
│   │   ├── income/
│   │   │   ├── income.model.ts
│   │   │   └── types.ts
│   │   └── expense/
│   │       ├── expense.model.ts
│   │       └── types.ts
│   │
│   ├── controllers/      # Route controllers (business logic)
│   │   ├── auth.controller.ts
│   │   ├── admin.controller.ts
│   │   ├── student.controller.ts
│   │   ├── employee.controller.ts
│   │   ├── donation.controller.ts
│   │   ├── income.controller.ts
│   │   ├── expense.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── services/         # Reusable business logic
│   │   ├── storage/
│   │   │   ├── IStorageService.ts
│   │   │   ├── S3StorageService.ts
│   │   │   └── storageFactory.ts
│   │   ├── analytics/
│   │   │   ├── analytics.service.ts
│   │   │   └── types.ts
│   │   └── pagination/
│   │       ├── pagination.service.ts
│   │       └── types.ts
│   │
│   ├── middlewares/      # Custom middleware
│   │   ├── auth/
│   │   │   ├── authenticate.ts
│   │   │   ├── authorize.ts
│   │   │   └── types.ts
│   │   ├── validation/
│   │   │   ├── validate.ts
│   │   │   └── schemas/
│   │   │       ├── auth.schema.ts
│   │   │       ├── student.schema.ts
│   │   │       ├── employee.schema.ts
│   │   │       └── ... (other schemas)
│   │   ├── upload.ts
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   │
│   ├── routes/           # API routes
│   │   ├── index.ts      # Main router (combines all routes)
│   │   ├── auth.routes.ts
│   │   ├── admin.routes.ts
│   │   ├── student.routes.ts
│   │   ├── employee.routes.ts
│   │   ├── donation.routes.ts
│   │   ├── income.routes.ts
│   │   ├── expense.routes.ts
│   │   └── dashboard.routes.ts
│   │
│   ├── utils/            # Shared helper functions
│   │   ├── jwt.ts
│   │   ├── asyncHandler.ts
│   │   └── AppError.ts
│   │
│   ├── types/            # Shared TypeScript types/interfaces
│   │   ├── express.d.ts   # Express request augmentation
│   │   ├── common.ts      # Common types (ApiResponse, PaginationQuery, etc.)
│   │   └── index.ts       # Export all shared types
│   │
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
│
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Structure Philosophy**:

- **Central folders** (`src/utils/`, `src/types/`): Shared utilities and types used across multiple modules
- **Local folders**: Module-specific types, utils, and logic stay close to their parent (e.g., `models/student/types.ts`)
- **Organized by feature**: Each model/service has its own folder with related files
- **Scalable**: Easy to add new features without cluttering central folders

## Core Features & Modules

### 1. Configuration Layer

- **Database**: MongoDB connection with Mongoose (connection pooling, error handling)
- **Environment**: dotenv with validation for required variables
- **Constants**: Centralized enums (roles, branches, donation types, etc.)

### 2. Authentication & Authorization

- **JWT Strategy**: Access tokens (15min) + Refresh tokens (7days) in httpOnly cookies
- **Password**: bcrypt hashing (salt rounds: 10)
- **Middleware**: `authenticate` (verify JWT), `authorize` (role-based access)
- **Endpoints**:
  - `POST /auth/login` - Phone + password
  - `POST /auth/refresh` - Refresh access token
  - `POST /auth/logout` - Clear tokens
  - `GET /auth/me` - Get current user

### 3. Models (Mongoose Schemas)

**IMPORTANT - Collaborative Model Design**:

All models will be designed based on your ERD with proper relationships. Before implementing any model, we will consult to understand:

- Entity relationships (one-to-one, one-to-many, many-to-many)
- Reference fields vs embedded documents
- Separate models for lookup tables (branches, sections, classes, types, etc.)
- Required fields, validation rules, and constraints
- Indexes and unique constraints

**Identified Entities from Frontend**:

- Admin (authentication, roles)
- Student (likely with references to: Guardian, Branch, Section, Class, Enrollment)
- Employee (likely with references to: Branch, EmploymentType)
- Donation (likely with references to: Donor, DonationType, Admin)
- Income (likely with references to: Branch, IncomeType, Admin)
- Expense (likely with references to: Branch, ExpenseType, Admin)

**Potential Lookup/Reference Models**:

- Branch, Section, Class, EmploymentType, DonationType, IncomeType, ExpenseType, Guardian

Models will be created incrementally after discussing the ERD structure for each entity to ensure proper database normalization and relationship mapping.

### 4. Services Layer (Reusable Business Logic)

**Storage Service** (Abstraction):

```typescript
type IStorageService = {
  upload: (file: Buffer, path: string) => Promise<string>;
  delete: (url: string) => Promise<void>;
  getSignedUrl: (key: string) => Promise<string>;
};

class S3StorageService implements IStorageService {
  // AWS S3 implementation
}

// Future: class CloudinaryStorageService, class LocalStorageService
```

**Analytics Service**:

- Calculate dashboard metrics (total students, income/expense summaries)
- Reusable across controllers

**Pagination Service**:

- Centralized pagination logic with filters, sorting

### 5. API Routes

```
/api/v1
  /auth
    POST   /login
    POST   /refresh
    POST   /logout
    GET    /me

  /admins
    GET    /           (list with pagination, filters)
    GET    /:id        (single admin)
    POST   /           (create - Super Admin only)
    PUT    /:id        (update)
    DELETE /:id        (delete - Super Admin only)

  /students
    GET    /           (list with pagination, filters: branch, class, section)
    GET    /:id        (single student)
    POST   /           (create with image upload)
    PUT    /:id        (update)
    DELETE /:id        (delete)

  /employees
    GET    /           (list with pagination, filters: branch, employment_type)
    GET    /:id        (single employee)
    POST   /           (create with image upload)
    PUT    /:id        (update)
    DELETE /:id        (delete)

  /donations
    GET    /           (list with pagination, filters: type, date range)
    GET    /:id
    POST   /
    PUT    /:id
    DELETE /:id

  /income
    GET    /           (list with pagination, filters: branch, type, date range)
    GET    /:id
    POST   /
    PUT    /:id
    DELETE /:id

  /expenses
    GET    /           (list with pagination, filters: branch, type, date range)
    GET    /:id
    POST   /
    PUT    /:id
    DELETE /:id

  /dashboard
    GET    /stats      (overview statistics)
```

### 6. Middleware Stack

**Error Handler**:

- Centralized error handling
- Custom `AppError` class
- Dev vs Production error responses

**Request Validator**:

- Zod schemas for request validation
- Validate body, query, params

**File Upload**:

- Multer middleware for multipart/form-data
- File size limits, type validation
- Memory storage (buffer) for S3 upload

**Rate Limiting**:

- Express-rate-limit for API protection

**Security**:

- helmet (security headers)
- cors (configure allowed origins)
- express-mongo-sanitize (prevent NoSQL injection)

### 7. Best Practices Implementation

**Error Handling**:

- Try-catch wrapper utility for async controllers
- Consistent error response format
- Proper HTTP status codes

**Validation**:

- Zod schemas for type-safe validation
- Reusable validation middleware

**Security**:

- Input sanitization
- Password strength requirements
- JWT secret rotation support
- Rate limiting on auth endpoints

**Code Organization**:

- One file per model, controller, route
- Service layer for shared logic
- Constants file for enums
- Proper TypeScript types

**Database**:

- Indexes on frequently queried fields (phone, email)
- Mongoose middleware for hooks (hash password, timestamps)
- Lean queries for performance

## Technology Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: jsonwebtoken + bcrypt
- **Validation**: Zod
- **File Upload**: Multer + AWS SDK v3
- **Security**: helmet, cors, express-rate-limit, express-mongo-sanitize
- **Dev Tools**: nodemon, ts-node

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/madrasha
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
CLIENT_URL=http://localhost:3000
```

## Implementation Steps

1. **Initial Setup**: Create folder structure, package.json, tsconfig, basic Express app
2. **Database**: MongoDB connection, base model setup
3. **Auth System**: JWT utilities, auth middleware, admin model, login/refresh endpoints
4. **Storage Service**: Abstract interface + S3 implementation
5. **Core Models**: Design and implement schemas based on ERD (will consult before creating each model)
6. **Controllers & Routes**: CRUD for all entities with validation
7. **Middleware**: Error handler, validators, file upload
8. **Services**: Analytics, pagination utilities
9. **Security & Polish**: Rate limiting, logging, documentation

## Key Implementation Files

- `src/config/database.ts` - MongoDB connection with retry logic
- `src/middlewares/auth.ts` - JWT verification + role-based access
- `src/middlewares/errorHandler.ts` - Global error handling
- `src/services/storage/IStorageService.ts` - Storage interface
- `src/services/storage/S3StorageService.ts` - AWS S3 implementation
- `src/utils/jwt.ts` - Token generation/verification helpers
- `src/utils/asyncHandler.ts` - Async wrapper for controllers
- `src/validators/auth.validator.ts` - Zod schemas for auth
- `src/controllers/auth.controller.ts` - Authentication logic

This architecture ensures maintainability, scalability, and follows industry best practices while keeping the codebase clean and modular.
