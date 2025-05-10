import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db";

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Listen
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
