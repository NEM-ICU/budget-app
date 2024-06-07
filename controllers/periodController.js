import PeriodModel from "../models/periodModel.js";

// Create a new period
export const createPeriod = async (req, res) => {
  try {
    const { name, duration } = req.body;
    const newPeriod = new PeriodModel({ name, duration });
    await newPeriod.save();
    res.status(201).json({ message: "Period created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all periods
export const getPeriods = async (req, res) => {
  try {
    const periods = await PeriodModel.find();
    res.status(200).json(periods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific period
export const getPeriod = async (req, res) => {
  try {
    const period = await PeriodModel.findById(req.params.id);
    if (!period) return res.status(404).json({ message: "Period not found" });
    res.status(200).json(period);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a period
export const updatePeriod = async (req, res) => {
  try {
    const period = await PeriodModel.findById(req.params.id);
    if (!period) return res.status(404).json({ message: "Period not found" });

    const { name, duration } = req.body;
    period.name = name || period.name;
    period.duration = duration || period.duration;

    await period.save();
    res.status(200).json({ message: "Period updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a period
export const deletePeriod = async (req, res) => {
  try {
    const period = await PeriodModel.findById(req.params.id);
    if (!period) return res.status(404).json({ message: "Period not found" });

    await period.remove();
    res.status(200).json({ message: "Period deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
