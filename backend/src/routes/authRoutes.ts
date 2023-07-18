import { Auth } from "./../middleware/Auth";
import express from "express";
import { authController } from "../controllers/authController";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", Auth, authController.getMe);

export { router as authRouter };
