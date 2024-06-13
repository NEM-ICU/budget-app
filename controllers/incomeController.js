import IncomeModel from "../models/incomeModel.js"; // adjust the path as necessary

// Create Income
export const createIncome = async (req, res) => {
  try {
    const { user, period, description, amount } = req.body;
    const newIncome = new IncomeModel({
      user,
      period,
      description,
      amount,
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Failed to create income", error });
  }
};

// Read All Incomes
export const getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeModel.find()
      .populate("user")
      .populate("period");
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve incomes", error });
  }
};

// Read Single Income by ID
export const getIncomeById = async (req, res) => {
  try {
    const income = await IncomeModel.findById(req.params.id)
      .populate("user")
      .populate("period");
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve income", error });
  }
};

// Update Income
export const updateIncome = async (req, res) => {
  try {
    const { user, period, description, amount, date } = req.body;
    const updatedIncome = await IncomeModel.findByIdAndUpdate(
      req.params.id,
      { user, period, description, amount, date },
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: "Failed to update income", error });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await IncomeModel.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete income", error });
  }
};
