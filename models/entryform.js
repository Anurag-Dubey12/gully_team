import mongoose from "mongoose";

const entryFormSchema = new mongoose.Schema({
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
});

export default mongoose.model("EntryForm", entryFormSchema);


