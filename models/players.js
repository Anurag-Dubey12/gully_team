import mongoose from "mongoose";

// Define the Player schema
const playerSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, //newly added by SS

  },
  matchId: { // DG
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: false, // DG updated this field to false as createTeam api threw "matchId required" error
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Batsman", "Bowler", "All Rounder", "Wicket Keeper", "Captain"],
    required: true,
  },
  battingStatistic: {
    tennis: {},
    leather: {},
  },
  bowlingStatistic: {
    tennis: {},
    leather: {},
  },
});

export default mongoose.model("Player", playerSchema);
