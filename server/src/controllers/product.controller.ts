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
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
export const searchProducts = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByPriceRange = async (req: Request, res: Response) => {
  const { min, max } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: min, $lte: max },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByStock = async (req: Request, res: Response) => {
  const { stock } = req.query;
  try {
    const products = await Product.find({
      stock: { $gte: stock },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByDescription = async (req: Request, res: Response) => {
  const { description } = req.query;
  try {
    const products = await Product.find({
      description: { $regex: description, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByCategoryAndPriceRange = async (
  req: Request,
  res: Response
) => {
  const { category } = req.params;
  const { min, max } = req.query;
  try {
    const products = await Product.find({
      category,
      price: { $gte: min, $lte: max },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByCategoryAndStock = async (
  req: Request,
  res: Response
) => {
  const { category } = req.params;
  const { stock } = req.query;
  try {
    const products = await Product.find({
      category,
      stock: { $gte: stock },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByCategoryAndName = async (
  req: Request,
  res: Response
) => {
  const { category } = req.params;
  const { name } = req.query;
  try {
    const products = await Product.find({
      category,
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByCategoryAndDescription = async (
  req: Request,
  res: Response
) => {
  const { category } = req.params;
  const { description } = req.query;
  try {
    const products = await Product.find({
      category,
      description: { $regex: description, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByPriceRangeAndStock = async (
  req: Request,
  res: Response
) => {
  const { min, max } = req.query;
  const { stock } = req.params;
  try {
    const products = await Product.find({
      price: { $gte: min, $lte: max },
      stock: { $gte: stock },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
