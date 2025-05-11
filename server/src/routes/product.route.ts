import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
// router.get("/:id", getProductById);

export default router;
