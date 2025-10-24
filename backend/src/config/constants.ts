// Database configuration constants
export const DATABASE_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY_MS = 5000;

// User roles
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

// Madrasha branches
export enum Branch {
  MAIN_CAMPUS = "main_campus",
  NORTH_CAMPUS = "north_campus",
  SOUTH_CAMPUS = "south_campus",
  EAST_CAMPUS = "east_campus",
  WEST_CAMPUS = "west_campus",
}

// Donation types
export enum DonationType {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  SPECIAL = "special",
  EMERGENCY = "emergency",
  ZAKAT = "zakat",
  SADAQAH = "sadaqah",
  WAQF = "waqf",
}

// Income types
export enum IncomeType {
  TUITION_FEES = "tuition_fees",
  DONATIONS = "donations",
  GOVERNMENT_GRANTS = "government_grants",
  INVESTMENT_RETURNS = "investment_returns",
  OTHER = "other",
}

// Expense types
export enum ExpenseType {
  SALARIES = "salaries",
  UTILITIES = "utilities",
  MAINTENANCE = "maintenance",
  BOOKS_SUPPLIES = "books_supplies",
  FOOD_CATERING = "food_catering",
  TRANSPORTATION = "transportation",
  MEDICAL = "medical",
  OTHER = "other",
}

// Employment types
export enum EmploymentType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  VOLUNTEER = "volunteer",
}

// Student sections
export enum StudentSection {
  BOYS = "boys",
  GIRLS = "girls",
  MIXED = "mixed",
}

// Student classes/grades
export enum StudentClass {
  NURSERY = "nursery",
  KG1 = "kg1",
  KG2 = "kg2",
  GRADE_1 = "grade_1",
  GRADE_2 = "grade_2",
  GRADE_3 = "grade_3",
  GRADE_4 = "grade_4",
  GRADE_5 = "grade_5",
  GRADE_6 = "grade_6",
  GRADE_7 = "grade_7",
  GRADE_8 = "grade_8",
  GRADE_9 = "grade_9",
  GRADE_10 = "grade_10",
  GRADE_11 = "grade_11",
  GRADE_12 = "grade_12",
  HAFIZ_CLASS = "hafiz_class",
  QURAN_CLASS = "quran_class",
  ARABIC_CLASS = "arabic_class",
}

// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File upload limits
export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

// JWT configuration
export const JWT_CONFIG = {
  ALGORITHM: "HS256" as const,
  ISSUER: "madrasha-backend",
  AUDIENCE: "madrasha-frontend",
} as const;
