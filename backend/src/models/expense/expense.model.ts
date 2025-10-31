import mongoose, { type Schema } from "mongoose";

const expenseSchema: Schema = new mongoose.Schema(
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
      min: 1,
      max: 10,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    expense_date: {
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

export const Expense = mongoose.model("Expense", expenseSchema);
