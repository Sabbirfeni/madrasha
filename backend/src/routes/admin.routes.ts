import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validation/validate";
import { createAdminSchema } from "../middlewares/validation/schemas/admin.schema";
import { createAdmin } from "../controllers/admin.controller";

const router = Router();

router.post(
  "/add-admin",
  validate(createAdminSchema),
  asyncHandler(createAdmin)
);

export default router;
