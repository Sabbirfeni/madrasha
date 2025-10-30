import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validation/validate";
import { loginSchema } from "../middlewares/validation/schemas/auth.schema";
import { login } from "../controllers/auth.controller";

const router = Router();

router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
