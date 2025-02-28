import mongoose, { Schema } from "mongoose";
import autopopulate from "mongoose-autopopulate";
const schema = new Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    autopopulate: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Denied"],
    default: "Pending",
  },
  round: {
    type: Number, 
    default: 0,
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    autopopulate: {
      select: "tournamentName tournamentLimit email isDeleted ", // Specify the fields you want to autopopulate
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: {
      select: "fullName isOrganizer email phoneNumber fcmToken ", // Specify the fields you want to autopopulate
    },
  },
  //below fields added by DG for teamElimination and pointsTable api
  isEliminated: { type: Boolean, default: false }, 
   
  eliminatedInRound: {
    type: String, 
    default: null,
  },
  
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  ties: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  
});
schema.set("timestamps", true);
schema.plugin(autopopulate);
export default mongoose.model("RegisteredTeam", schema);
     