import mongoose from "mongoose";
import ImageUploader from '../helpers/ImageUploader.js'; 

const shopSchema = new mongoose.Schema({
    websiteURL : { 
        type: String, required: false
    },
    description: [{ 
        type: String,
        required: true 
    }],
    locationProof: {
         type: String, 
         required: true 
        },
    businessLicense: {
         type: String, 
         required: true
         },
    VAT: { 
        type: String, 
        required: true },
    socialmediaLinks: { 
        type: String, 
        required: true },
    createdAt: { 
        type: Date, default: Date.now 
    }
});


export default mongoose.model('Shop', shopSchema);