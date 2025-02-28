import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['terms','faq', 'disclaimer', 'privacy-policy', 'welcome-message'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active', 
  },
});


export default mongoose.model('Content', contentSchema);


