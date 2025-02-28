import mongoose from "mongoose";

// Define the banner schema
const updateSchema = new mongoose.Schema({
    version: {
      type: String,
      required: true
    },
    forceUpdate: {
      type: Boolean,
      default: true
    }
  });
  updateSchema.set('timestamps', true);
  // Create the Banner model
 export default mongoose.model('Update', updateSchema);
  