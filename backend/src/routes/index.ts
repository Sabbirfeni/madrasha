import { Router } from "express";
import systemRoutes from "./system.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import employeeRoutes from "./employee.routes";
import studentRoutes from "./student.routes";
import incomeRoutes from "./income.routes";
import donationRoutes from "./donation.routes";
import expenseRoutes from "./expense.routes";
import analyticsRoutes from "./analytics.routes";
import { authenticate } from "../middlewares/auth/authenticate";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// Mount root-level routes
router.use("/", systemRoutes);
router.use("/", authRoutes);

// Protect all routes after public ones
router.use(asyncHandler(authenticate));

router.use("/admins", adminRoutes);
router.use("/employees", employeeRoutes);
router.use("/students", studentRoutes);
router.use("/incomes", incomeRoutes);
router.use("/donations", donationRoutes);
router.use("/expenses", expenseRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
