import mongoose from "mongoose";

// Create your player schema
const lookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      default: [],
    },
    selectLocation: String,
  },
});

lookingSchema.set("timestamps", true);

// Create index on the coordinates field
lookingSchema.index({ "location": "2dsphere" });

export default mongoose.model("Looking", lookingSchema);
