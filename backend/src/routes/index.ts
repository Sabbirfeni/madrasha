import { Router } from "express";
import systemRoutes from "./system.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import employeeRoutes from "./employee.routes";
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

export default router;
