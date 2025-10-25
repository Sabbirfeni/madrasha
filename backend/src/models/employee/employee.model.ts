import mongoose, { type Schema } from "mongoose";

const employeeSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
    },
    branch: {
      type: String,
      required: true,
      ref: "Branch",
    },
    role: {
      type: String,
      required: true,
      ref: "Role",
    },
    designation: {
      type: String,
      required: true,
      ref: "Designation",
    },
    fullname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    profile_image: {
      type: String,
      maxlength: 255,
    },
    nid_no: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^\d{17}$/.test(v);
        },
        message: "NID number must be exactly 17 digits",
      },
    },
    gender: {
      type: String,
      required: true,
      maxlength: 20,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^01\d{9}$/.test(v);
        },
        message: "Phone number must be 11 digits starting with 01",
      },
    },
    join_date: {
      type: Date,
      required: true,
    },
    resign_date: {
      type: Date,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
      max: 9999999999, // 10 digits max
    },
    bonus: {
      type: Number,
      default: 0,
      min: 0,
      max: 9999999999, // 10 digits max
    },
    current_location: {
      type: String,
      required: true,
      maxlength: 250,
    },
    permanent_location: {
      type: String,
      required: true,
      maxlength: 250,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
