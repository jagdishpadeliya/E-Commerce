import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import productsRouter from "./routes/product.route";
import authRouter from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
// Listen
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
