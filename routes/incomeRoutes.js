import express from "express";
import {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router.post("/", createIncome);
router.get("/", getIncomes);
router.get("/:id", getIncomeById);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

export default router;
