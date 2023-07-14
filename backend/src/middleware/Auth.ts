import { NextFunction, Response } from "express";
import { parseJwt } from "../utils/jwt";

export const Auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "A token is required for authentication",
        errorType: "unauthorized",
      });
    }

    // Verify the token and check for expiration
    const user = parseJwt(token);
    if (!user) {
      return res.status(401).json({
        message: "Invalid Token",
        errorType: "unauthorized",
      });
    }

    // Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // @ts-ignore
    if (user.exp < currentTimestamp) {
      return res.status(401).json({
        message: "Token has expired",
        errorType: "unauthorized",
      });
    }

    req.user = user;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
      errorType: "unauthorized",
    });
  }
  return next();
};
