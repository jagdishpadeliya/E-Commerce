import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model";
import { faker } from "@faker-js/faker";

dotenv.config();

const category = ["electronics", "clothing", "books", "home", "toys", "fruits"];

const generateProducts = (count: number) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement(category),
      stock: faker.number.int({ min: 0, max: 100 }),
    });
  }
  return products;
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    const products = generateProducts(100);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

seedProducts();
