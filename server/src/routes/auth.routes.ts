import express from "express";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller";
import { authRateLimiter } from "../middleware/rateLimiter";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", authRateLimiter, loginUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
