import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
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

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
