import { Router } from "express";
import systemRoutes from "./system.routes";
import adminRoutes from "./admin.routes";

const router = Router();

// Mount system routes at root level
router.use("/", systemRoutes);

router.use("/api/admins", adminRoutes);

// Future API routes will be mounted here
// Example:
// router.use("/api/v1/auth", authRoutes);
// router.use("/api/v1/students", studentRoutes);
// router.use("/api/v1/employees", employeeRoutes);
// router.use("/api/v1/donations", donationRoutes);
// router.use("/api/v1/income", incomeRoutes);
// router.use("/api/v1/expenses", expenseRoutes);
// router.use("/api/v1/dashboard", dashboardRoutes);

export default router;
