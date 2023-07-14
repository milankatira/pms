import express from "express";
import { authRouter } from "./authRoutes";
import { projectRouter } from "./projectRoutes";
import { logRouter } from "./logRoutes";
import { Auth } from "../middleware/Auth";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/projects", Auth, projectRouter);
router.use("/logs", Auth, logRouter);

export { router as indexRouter };
