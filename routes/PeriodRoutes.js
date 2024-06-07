import { Router } from "express";
import {
  createPeriod,
  getPeriods,
  getPeriod,
  updatePeriod,
  deletePeriod,
} from "../controllers/periodController.js";

const router = Router();

router.post("/", createPeriod);
router.get("/", getPeriods);
router.get("/:id", getPeriod);
router.put("/:id", updatePeriod);
router.delete("/:id", deletePeriod);

export default router;
