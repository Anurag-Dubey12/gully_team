import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

// Define schema for order history
const orderHistorySchema = new mongoose.Schema({
  // orderId: { type: mongoose.Schema.Types.ObjectId, required: true }, // (Nikhil) Unique ID for the order
  orderId: { type: String, required: true }, // DG Changed from ObjectId to String
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // autopopulate: {
    //   select: "phoneNumber email fullName ", // Specify the fields you want to autopopulate
    // },
  },

  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    
  },
  bannerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PromotionalBanner",
    required: false,
  },
  sponsorPackageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: false,
  },
  ordertype: {
    type: String,
    required: true,
    enum: ['tournament', 'banner', 'Sponsor']
  },
  
  amountWithoutCoupon: { type: Number, required: false },
  coupon: { type: String, required: false },
  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CouponHistory",
  },

  amount: { type: Number, required: true }, // Total amount of the order
  amountPaid: { type: Number, required: true }, // Amount already paid
  amountDue: { type: Number, required: true }, // Amount yet to be paid
  currency: { type: String, required: true }, // Currency of the order
  receipt: { type: String, required: true }, // Receipt ID of the order
  // status: { type: String, required: true ,default:"Pending"}, // Status of the order (nikhil)
  status: { type: String, enum: ["Pending", "Successful", "Failed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }, // Timestamp of order creation
});

// Create model for order history

orderHistorySchema.set("timestamps", true);
orderHistorySchema.plugin(autopopulate);
export default mongoose.model("OrderHistory", orderHistorySchema);
