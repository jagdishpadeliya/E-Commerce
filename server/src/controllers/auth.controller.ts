import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/helper";
import { log } from "console";

// @desc   Register new user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateAccessToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// @desc   Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: IUser | null = (await User.findOne({ email })) as IUser;
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure:
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "development", // Allow on both production and local
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expiration (7 days)
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error logging in" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded: any = verifyRefreshToken(refreshToken);
    const userId = decoded.id;

    const user: IUser | null = (await User.findById(userId)) as IUser;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const accessToken = generateAccessToken(userId);

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
