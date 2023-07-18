import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { authService } from "../services/authService";
import { ObjectId } from "mongoose";

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user: IUser = new User({
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user: IUser | null = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "secret",
        {
          expiresIn: "30d",
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getMe(req: any, res: Response): Promise<void> {
    try {
      const user = await authService.getMe(
        req.user.userId as unknown as ObjectId
      );
      delete user.password;
      if (user) {
        res.status(200).json({ message: "userInfo fetch successfully", user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
