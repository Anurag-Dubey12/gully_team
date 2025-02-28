import mongoose from "mongoose";

// Define the Player schema
const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    expiryTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Otp", otpSchema);
