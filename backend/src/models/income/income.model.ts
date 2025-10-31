import mongoose, { type Schema } from "mongoose";

const incomeSchema: Schema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
    branch: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    income_date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

export const Income = mongoose.model("Income", incomeSchema);
