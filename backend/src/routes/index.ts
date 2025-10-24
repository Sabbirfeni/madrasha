import { Router } from "express";
import systemRoutes from "./system.routes";

const router = Router();

// Mount system routes at root level
router.use("/", systemRoutes);

// Future API routes will be mounted here
// Example:
// router.use("/api/v1/auth", authRoutes);
// router.use("/api/v1/admins", adminRoutes);
// router.use("/api/v1/students", studentRoutes);
// router.use("/api/v1/employees", employeeRoutes);
// router.use("/api/v1/donations", donationRoutes);
// router.use("/api/v1/income", incomeRoutes);
// router.use("/api/v1/expenses", expenseRoutes);
// router.use("/api/v1/dashboard", dashboardRoutes);

export default router;
