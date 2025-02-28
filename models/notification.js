import mongoose from "mongoose";

// Define the notification schema
const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['send', 'unsend'],
    default: 'unsend'
  },
  imageUrl: {
    type: String
  }
});

notificationSchema.set('timestamps', true);
export default mongoose.model("Notification", notificationSchema);
// Create the Notification model

