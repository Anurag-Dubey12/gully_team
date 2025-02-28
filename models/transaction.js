import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: {
      select: "phoneNumber email fullName ", // Specify the fields you want to autopopulate
    },
  },
  orderId: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref:"OrderHistory",
    required: true,
    autopopulate: {
      select: "couponId amount amountPaid status createdAt", // Specify the fields you want to autopopulate
    },
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: false,
    autopopulate: {
      select: "tournamentName fees ballCharges breakfastCharges", // Specify the fields you want to autopopulate
    },
  },
  amountWithoutCoupon: { type: Number },
  coupon: { type: String },
  amount: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  amountDue: { type: Number, required: true },
  currency: { type: String, required: true },
  receipt: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
},
{ timestamps: true, collection: "transactions" }
);

// Add timestamps for createdAt and updatedAt fields
//transactionSchema.set("timestamps", true);
transactionSchema.plugin(autopopulate);
export default mongoose.model("Transaction", transactionSchema);
