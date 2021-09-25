import express from "express";
import apiRouter from "./routes/api.router.js";

// Server app
const app = express(); 

// Middlewares
app.use(express.json());
app.use("/api", apiRouter);

export default app;
