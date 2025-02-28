
import mongoose from "mongoose";

const CouponHistorySchema = new mongoose.Schema({
  couponName: { type: String, required: true }, // Coupon name field
  minAmount: { type: Number, required: true }, // min amount of the avail coupon
  discount: { type: Number, required: true }, // discount percentage/amount
  type: {
    type: String,
    enum: ["Flat", "Percentage"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
  },
  isUsed:{
    type: Boolean,
    default: false,
    required: false,
  }
 
});

CouponHistorySchema.set("timestamps", true);
export default mongoose.model("CouponHistory", CouponHistorySchema);
