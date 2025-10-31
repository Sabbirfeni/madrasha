import { type Document, type Types } from "mongoose";

export type DonationDocument = Document & {
  admin_id: Types.ObjectId;
  donation_type: number;
  fullname: string;
  phone_number: string;
  donation_amount: number;
  donation_date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DonationListItem = {
  _id: string;
  donation_type: number;
  fullname: string;
  phone_number: string;
  donation_amount: number;
  donation_date: Date;
  notes?: string;
  admin_id: {
    _id: string;
    employee_id: {
      _id: string;
      fullname: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDonationInput = {
  donation_type: number;
  fullname: string;
  phone_number: string;
  donation_amount: number;
  donation_date: string;
  notes?: string;
};

export type UpdateDonationInput = CreateDonationInput;
