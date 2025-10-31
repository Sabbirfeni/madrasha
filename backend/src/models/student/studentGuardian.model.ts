import mongoose, { type Schema } from "mongoose";

const studentGuardianSchema: Schema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    guardian_name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    guardian_relation: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phone_number: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^\d{11}$/.test(value);
        },
        message: "Phone number must be exactly 11 digits",
      },
    },
    current_location: {
      type: String,
      required: true,
      maxlength: 150,
    },
    permanent_location: {
      type: String,
      required: true,
      maxlength: 150,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentGuardian = mongoose.model(
  "StudentGuardian",
  studentGuardianSchema
);
