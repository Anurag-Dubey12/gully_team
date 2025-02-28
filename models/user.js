import mongoose from "mongoose";
// import Coordinate from "./coordinate.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  isNewUser: {
    type: Boolean,
    default: true,
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
  isOrganizer: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true,
  },
  accessToken: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    selectLocation: String,
  },
  // registrationDate: {
  //   type: Date,
  // },

  fcmToken: {
    type: String,
    default: null,
  },
  deviceType: {
    type: Number,
  },
  androidType: {
    type: String,
  },
  banStatus: {
    type: String,
    enum: ["active", "inactive", "ban"],
    default: "active",
  },
  banExpiresAt: {
    type: Date,
    default: null,
  },
  profilePhoto: {
    type: String,
  },
  nickName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    sparse: true, // Allow multiple documents to have a null email value
  },
  isPhoneNumberVerified: {
    type: Boolean,
    default: false,
  },
});
userSchema.set("timestamps", true);
// Add 2dsphere index to the 'locations' field
userSchema.index({ location: "2dsphere" });

//userSchema.index({ email: 1 }, { unique: true, sparse: true })

export default mongoose.model("User", userSchema);
