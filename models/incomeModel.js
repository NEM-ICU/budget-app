import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  period: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Period",
    required: true,
  },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const IncomeModel = mongoose.model("Income", IncomeSchema);

export default IncomeModel;
