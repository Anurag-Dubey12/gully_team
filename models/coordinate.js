import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  placeName: String,
  timestamp: { type: Date, default: Date.now },
});

const Coordinate = mongoose.model("Coordinate", coordinateSchema);

export default Coordinate;