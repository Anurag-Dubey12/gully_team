// models/PlayerPerformance.js
import mongoose from "mongoose";

const playerPerformanceSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    ballType: {
        type: String,
        enum: ['leather', 'tennis'],
        required: true
    },
    runs: {
        type: Number,
        required: true
    },
    wickets: {
        type: Number,
        required: true
    },
    tournamentDate: {
        type: Date,
        required: true
    },
    team: {
        type: String,
        required: true
    }
});

export default mongoose.model("playerPerformance", playerPerformanceSchema);
