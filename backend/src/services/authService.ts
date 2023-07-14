import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

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
};
