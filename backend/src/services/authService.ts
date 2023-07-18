import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { ObjectId } from "mongoose";

export const authService = {
  generateToken(user: IUser): string {
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return token;
  },

  async getMe(userId: ObjectId) {
    return await User.findById(userId,{password:0});
  },
};
