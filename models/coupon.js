import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  couponName: { type: String, required: true }, // Coupon name field
  minAmount: { type: Number, required: true }, // min amount of the avail coupon
  discount: { type: Number, required: true }, // discount percentage/amount
  description:{ type: String, required: true },
  title:{ type: String, required: true },
  type: {
    type: String,
    enum: ["Flat", "Percentage"],
    required: true,
  },
  startDate: { type: Date, required: true }, // Start date field
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.startDate <= value;
      },
      message: "End date must be greater than or equal to start date",
    },
  }, // End date field, and it must be greater than or equal to startDate
});

CouponSchema.set("timestamps", true);
export default mongoose.model("Coupon", CouponSchema);
