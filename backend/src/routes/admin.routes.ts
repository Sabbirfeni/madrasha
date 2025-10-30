import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validation/validate";
import {
  createAdminSchema,
  updateAdminSchema,
} from "../middlewares/validation/schemas/admin.schema";
import {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.controller";

const router = Router();

router.get("/", asyncHandler(getAdmins));

router.post(
  "/add-admin",
  validate(createAdminSchema),
  asyncHandler(createAdmin)
);

router.patch("/:id", validate(updateAdminSchema), asyncHandler(updateAdmin));

router.delete("/:id", asyncHandler(deleteAdmin));

export default router;
