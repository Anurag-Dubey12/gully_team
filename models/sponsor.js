import mongoose from "mongoose";

const sponsor_schema = new mongoose.Schema(
  {
    sponsorMedia: {
      type: String,
    },
    sponsorName: {
      type: String,
    },
    sponsorDescription: {
      type: String,
      required: false,
    },
    sponsorUrl: {
      type: String,
      required: false,
      default: ""
    },
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

sponsor_schema.set("timestamps", true);

export default mongoose.model("Sponsor", sponsor_schema);
