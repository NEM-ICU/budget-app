import express from "express";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

import periodRouter from "./routes/PeriodRoutes.js";

app.use("/api/v1/period", periodRouter);

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

export { app };
