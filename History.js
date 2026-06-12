import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  results: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("History", HistorySchema, "history");
