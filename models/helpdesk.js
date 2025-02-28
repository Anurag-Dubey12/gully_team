import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

// Helpdesk ticket schema
const helpdeskSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'InProgress'],
      default: 'Open',
    },
    response: {
      type: String,
      default:null
    },
  });

  helpdeskSchema.set('timestamps', true);
  helpdeskSchema.plugin(autopopulate);
  export default mongoose.model('Helpdesk', helpdeskSchema);
