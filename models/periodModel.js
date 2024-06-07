import mongoose from "mongoose";

const PeriodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  duration: { type: Number, required: true }, // duration in days
  createdAt: { type: Date, default: Date.now },
});

const PeriodModel = mongoose.model("Period", PeriodSchema);

export default PeriodModel;
