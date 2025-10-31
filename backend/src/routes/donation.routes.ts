import { Router } from "express";

import {
  getDonations,
  createDonation,
  updateDonation,
} from "../controllers/donation.controller";
import { validate } from "../middlewares/validation/validate";
import {
  createDonationSchema,
  updateDonationSchema,
} from "../middlewares/validation/schemas/donation.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getDonations));

router.post(
  "/create-donation",
  validate(createDonationSchema),
  asyncHandler(createDonation)
);

router.put(
  "/:id",
  validate(updateDonationSchema),
  asyncHandler(updateDonation)
);

export default router;
