import { Router } from "express";
import systemRoutes from "./system.routes";
import adminRoutes from "./admin.routes";
import employeeRoutes from "./employee.routes";

const router = Router();

// Mount system routes at root level
router.use("/", systemRoutes);

router.use("/admins", adminRoutes);
router.use("/employees", employeeRoutes);

export default router;
