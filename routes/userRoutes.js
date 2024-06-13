import { rootLogin, createRoot } from "../controllers/authController.js";

import { Router } from "express";

const router = Router();

// user login
router.post("/login", rootLogin);

// user signup
router.post("/signUp", createRoot);

export default router;
