// models/Vendor.js
import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Validate 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: { type: String, required: true},
    identityProof: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: [
            "Football Coaching", "Basketball Coaching", "Cricket Coaching", "Tennis Coaching",
            "Badminton Coaching", "Volleyball Coaching", "Table Tennis Coaching", "Rugby Coaching",
            "Hockey Coaching", "Squash Coaching", "Golf Coaching", "Baseball Coaching",
            "Softball Coaching", "Lacrosse Coaching", "Field Hockey Coaching", "Handball Coaching",
            "Netball Coaching", "Archery Coaching", "Fencing Coaching", "Wrestling Coaching"
        ]
    },
    description: { type: String, required: true },
    experience: { type: Number, required: true },
    duration: { 
        type: String, // Changed to String to accommodate "hrs, days, months"
        required: true,
        validate: {
            validator: function(value) {
                return /^(hrs|days|months)$/i.test(value.trim());
            },
            message: props => `${props.value} is not a valid duration! Accepted values are "hrs, days, months".`
        }
    },
    fees: { 
        type: Number, 
        required: true, 
        validate: {
            validator: Number.isFinite, // Ensure fees is a number
            message: props => `${props.value} is not a valid fee!`
        }
    },
    serviceType: { type: String, required: true },
    serviceImages: { type: [String], required: true }, // Added field for service images
    isVendorDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    isVerified: { type: Boolean, default: false }, // New field for verification status
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Vendor', VendorSchema);
