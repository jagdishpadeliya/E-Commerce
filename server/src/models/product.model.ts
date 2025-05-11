import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
      minLength: 3,
      maxLength: 100,
      validate: {
        validator: (value: string) => {
          return /^[a-zA-Z0-9 ]+$/.test(value);
        },
        message: (props: any) => `${props.value} is not a valid product name!`,
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
      validate: {
        validator: (value: number) => {
          return Number.isInteger(value);
        },
        message: (props: any) => `${props.value} is not a valid price!`,
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 1000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["electronics", "clothing", "books", "home", "toys", "fruits"],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
      validate: {
        validator: (value: number) => {
          return Number.isInteger(value);
        },
        message: (props: any) =>
          `${props.value} is not a valid stock quantity!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
