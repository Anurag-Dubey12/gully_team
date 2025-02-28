import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const eliminatedTeamSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
    autopopulate: { select: "Round" },
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  eliminatedInRound: {
    type: String,
    required: true,
  },
  eliminatedAt: {
    type: Date,
    default: Date.now,
  },

});

eliminatedTeamSchema.plugin(autopopulate);
eliminatedTeamSchema.set('timestamps', true);

export default mongoose.model("EliminatedTeam", eliminatedTeamSchema);
