import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";
import mongoose from "mongoose";

// Store server instance for graceful shutdown
let server: ReturnType<typeof app.listen> | null = null;

// Graceful shutdown function
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n⚠️  ${signal} received, shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log("🔌 Express server closed");
    });
  }

  try {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error);
  }

  console.log("✅ Graceful shutdown completed");
  process.exit(0);
};

// Handle uncaught exceptions EARLY to catch errors during imports
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);

  // If it's a port conflict, try graceful shutdown
  if ((error as any).code === "EADDRINUSE") {
    console.log("🔄 Port conflict detected, attempting graceful shutdown...");
    gracefulShutdown("EADDRINUSE");
  } else {
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Check if port is available
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const testServer = require("net").createServer();
    testServer.listen(port, () => {
      testServer.close(() => resolve(true));
    });
    testServer.on("error", () => resolve(false));
  });
};

// Main server startup function
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB first
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();

    // Check if port is available before starting server
    const PORT = env.PORT;
    const portAvailable = await isPortAvailable(PORT);

    if (!portAvailable) {
      console.error(`❌ Port ${PORT} is already in use`);
      console.log("💡 Try one of these solutions:");
      console.log(
        "   1. Kill the process using the port: lsof -ti:5000 | xargs kill -9"
      );
      console.log(
        "   2. Use a different port by setting PORT environment variable"
      );
      process.exit(1);
    }

    // Start Express server only after successful DB connection
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${env.NODE_ENV}`);
      console.log(`🌐 Client URL: ${env.CLIENT_URL}`);
      console.log("✅ Server startup completed successfully");
    });
  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
