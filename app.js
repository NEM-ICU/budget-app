import express from "express";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

import periodRouter from "./routes/PeriodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js";
import incomeRouter from "./routes/incomeRoutes.js";

app.use("/api/v1/period", periodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/income", incomeRouter);

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

export { app };
