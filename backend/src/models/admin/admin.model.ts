import mongoose, { type Schema } from "mongoose";
import { UserRole } from "../../config/constants";
import { generateStrongPassword } from "./utils";
import { hashPassword } from "../../utils/password";

const adminSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
    },
    employee_id: {
      type: String,
      required: true,
      ref: "Employee",
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.ADMIN,
    },
    access_boys_section: {
      type: Boolean,
      required: true,
    },
    access_girls_section: {
      type: Boolean,
      required: true,
    },
    access_residential_section: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (this.isNew && !this.password) {
    const plainPassword = generateStrongPassword();
    this.password = await hashPassword(plainPassword);
  }
  next();
});

export const Admin = mongoose.model("Admin", adminSchema);
