import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    LasLogin: {
      type: Date,
      default: Date.now,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    resestPasswordCode: String,
    resestPasswordExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
