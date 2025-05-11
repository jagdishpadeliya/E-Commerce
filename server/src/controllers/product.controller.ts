import { Request, Response } from "express";
import Product from "../models/product.model";
import { log } from "console";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // log("Creating product...", req.body);
    const { name, price, description, category, stock } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error creating product" });
  }
};
