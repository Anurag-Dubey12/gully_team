import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    firstname : { type : String },
    lastname : { type : String},
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    role: {
      type: String,
      enum: ['Admin', 'subAdmin'], 
      required: true,
    },
    rights: [{
      type: String,
      enum: ['Users', 'Organizer', 'Addsports', 'Fess&offer', 'Notification', 'ContentManager', 'Helpdesk', 'subAdmin', 'Reporting'],
    }],
    accessToken: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  });

  AdminSchema.set('timestamps', true);
  // Create the Banner model
 export default mongoose.model('Admin', AdminSchema);