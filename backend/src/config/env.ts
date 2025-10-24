import { z } from "zod";

// Environment validation schema
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1000).max(65535))
    .default("5000"),

  // MongoDB configuration
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .refine(
      (uri) => uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"),
      "MONGODB_URI must be a valid MongoDB connection string"
    ),

  // JWT configuration
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  // AWS S3 configuration
  AWS_REGION: z.string().min(1, "AWS_REGION is required"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_S3_BUCKET: z.string().min(1, "AWS_S3_BUCKET is required"),

  // Client configuration
  CLIENT_URL: z
    .string()
    .url("CLIENT_URL must be a valid URL")
    .default("http://localhost:3000"),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Environment validation failed:");
      error.errors.forEach((err) => {
        console.error(`   ${err.path.join(".")}: ${err.message}`);
      });
      console.error("\n📝 Required environment variables:");
      console.error(
        "   NODE_ENV, PORT, MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET"
      );
      console.error(
        "   AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET"
      );
      console.error(
        "   CLIENT_URL (optional, defaults to http://localhost:3000)"
      );
      console.error("\n💡 Copy .env.example to .env and fill in your values");
      process.exit(1);
    }
    throw error;
  }
};

// Export validated environment configuration
export const env = parseEnv();

// Export type for TypeScript
export type EnvConfig = z.infer<typeof envSchema>;
