import mongoose from "mongoose";
import { env } from "./env";
import { DATABASE_RETRY_ATTEMPTS, RETRY_DELAY_MS } from "./constants";

// MongoDB error types for better error handling
type MongoError = Error & {
  code?: number;
  codeName?: string;
  name?: string;
};

type MongoServerError = MongoError & {
  name: "MongoServerError";
  code: number;
};

// Enhanced error message generator
const getErrorMessage = (error: MongoError, attempt: number): string => {
  const isLastAttempt = attempt === DATABASE_RETRY_ATTEMPTS;

  // Authentication errors (MongoServerError code 18)
  if (
    error.name === "MongoServerError" &&
    (error as MongoServerError).code === 18
  ) {
    return `❌ MongoDB Authentication Failed
   Reason: Invalid username or password in MONGODB_URI
   Fix: Check MONGODB_URI credentials in .env file
   URI format: mongodb+srv://username:password@host/database
   ${isLastAttempt ? "💥 All connection attempts failed. Exiting..." : ""}`;
  }

  // Network errors
  if (error.name === "MongoNetworkError") {
    const hostMatch = env.MONGODB_URI.match(/@([^/]+)/);
    const host = hostMatch ? hostMatch[1] : "unknown host";

    return `❌ MongoDB Network Error
   Cannot reach: ${host}
   Possible causes:
   - No internet connection
   - MongoDB Atlas IP whitelist doesn't include your IP
   - Firewall blocking port 27017
   Fix: Add your IP to MongoDB Atlas Network Access settings
   ${isLastAttempt ? "💥 All connection attempts failed. Exiting..." : ""}`;
  }

  // DNS resolution errors
  if (
    error.message.includes("getaddrinfo ENOTFOUND") ||
    error.message.includes("ENOTFOUND")
  ) {
    const hostMatch = env.MONGODB_URI.match(/@([^/]+)/);
    const hostname = hostMatch ? hostMatch[1] : "unknown hostname";

    return `❌ MongoDB DNS Error
   Cannot resolve hostname: ${hostname}
   Fix: Verify MONGODB_URI spelling and domain in .env
   ${isLastAttempt ? "💥 All connection attempts failed. Exiting..." : ""}`;
  }

  // Timeout errors
  if (
    error.message.includes("timeout") ||
    error.message.includes("timed out")
  ) {
    const hostMatch = env.MONGODB_URI.match(/@([^/]+)/);
    const host = hostMatch ? hostMatch[1] : "unknown host";

    return `❌ MongoDB Connection Timeout
   Server at ${host} took too long to respond (>5s)
   Possible causes:
   - MongoDB Atlas cluster is paused/stopped
   - Network latency issues
   - Server overload
   Fix: Check MongoDB Atlas cluster status dashboard
   ${isLastAttempt ? "💥 All connection attempts failed. Exiting..." : ""}`;
  }

  // Invalid URI format
  if (
    error.message.includes("Invalid connection string") ||
    error.message.includes("Invalid URI")
  ) {
    return `❌ MongoDB URI Error
   Connection string format is invalid
   Expected format: mongodb+srv://username:password@host/database
   Current URI: ${env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")}
   ${isLastAttempt ? "💥 All connection attempts failed. Exiting..." : ""}`;
  }

  // Generic error
  return `❌ MongoDB Connection Error
   ${error.message}
   ${isLastAttempt ? "💥 All connection attempts failed. Exiting..." : ""}`;
};

// Connection retry logic with exponential backoff
const connectWithRetry = async (): Promise<void> => {
  for (let attempt = 1; attempt <= DATABASE_RETRY_ATTEMPTS; attempt++) {
    try {
      console.log(
        `🔄 MongoDB connection attempt ${attempt}/${DATABASE_RETRY_ATTEMPTS}...`
      );

      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      console.log("✅ MongoDB connected successfully");
      console.log(
        `   Database: ${mongoose.connection.db?.databaseName || "unknown"}`
      );
      console.log(`   Host: ${mongoose.connection.host || "unknown"}`);
      console.log(`   Port: ${mongoose.connection.port || "unknown"}`);

      return; // Success, exit retry loop
    } catch (error) {
      const mongoError = error as MongoError;
      const errorMessage = getErrorMessage(mongoError, attempt);

      console.error(errorMessage);

      // Show stack trace in development mode only
      if (env.NODE_ENV !== "production") {
        console.error("Stack trace:", mongoError.stack);
      }

      // If this was the last attempt, exit the process
      if (attempt === DATABASE_RETRY_ATTEMPTS) {
        console.error(
          "\n🚨 Failed to connect to MongoDB after all retry attempts"
        );
        console.error(
          "   Please check your MongoDB Atlas configuration and try again"
        );
        process.exit(1);
      }

      // Wait before retrying
      console.log(
        `⏳ Retrying in ${RETRY_DELAY_MS / 1000} seconds... (Attempt ${
          attempt + 1
        }/${DATABASE_RETRY_ATTEMPTS})`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

// Set up connection event listeners
const setupConnectionListeners = (): void => {
  mongoose.connection.on("connected", () => {
    console.log("🟢 MongoDB connection established");
  });

  mongoose.connection.on("error", (error) => {
    console.error("🔴 MongoDB connection error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("🟡 MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🟢 MongoDB reconnected");
  });
};

// Graceful shutdown handler
const setupGracefulShutdown = (): void => {
  const gracefulShutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Closing MongoDB connection...`);

    try {
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed gracefully");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error closing MongoDB connection:", error);
      process.exit(1);
    }
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

// Main database connection function
export const connectDB = async (): Promise<void> => {
  try {
    // Set up connection event listeners
    setupConnectionListeners();

    // Set up graceful shutdown handlers
    setupGracefulShutdown();

    // Attempt connection with retry logic
    await connectWithRetry();
  } catch (error) {
    console.error("💥 Unexpected error during database connection:", error);
    process.exit(1);
  }
};

// Export connection status checker
export const isConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

// Export connection info getter
export const getConnectionInfo = () => {
  if (!isConnected()) {
    return {
      status: "disconnected",
      readyState: mongoose.connection.readyState,
    };
  }

  return {
    status: "connected",
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.db?.databaseName,
  };
};
