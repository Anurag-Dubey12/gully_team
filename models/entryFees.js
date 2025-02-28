import mongoose from "mongoose";

// Define the entryFees schema
const EntryFeesSchema = new mongoose.Schema({
    initialteamLimit: {
      type: Number,
      required: true
    },
    endteamLimit: {
      type: Number,
      required: true
    },
    fees: {
      type: Number,
      required: true
    }
    

  });
  EntryFeesSchema.set('timestamps', true);
  // Create the entryFees model
 export default mongoose.model('EntryFees', EntryFeesSchema);