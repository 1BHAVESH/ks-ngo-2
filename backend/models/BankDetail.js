import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    qrCode: {
      type: String, // URL ya Base64
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true, // multiple hon to ek show kar sakte ho
    },
  },
  { timestamps: true }
);

export const BankDetail =  mongoose.model("BankDetail", bankSchema);
