import mongoose from "mongoose";

const BannerpaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bannerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotional_Banner_model",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Successful", "Failed"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    receipt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bannerpayment", BannerpaymentSchema);
