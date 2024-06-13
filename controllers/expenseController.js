import ExpenseModel from "../models/exprenseModel.js";

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { user, period, description, amount } = req.body;
    const newExpense = new ExpenseModel({
      user,
      period,
      description,
      amount,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense", error });
  }
};

// Read All Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find()
      .populate("user")
      .populate("period");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve expenses", error });
  }
};

// Read Single Expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const expense = await ExpenseModel.findById(req.params.id)
      .populate("user")
      .populate("period");
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve expense", error });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { user, period, description, amount, date } = req.body;
    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      req.params.id,
      { user, period, description, amount, date },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense", error });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await ExpenseModel.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense", error });
  }
};
