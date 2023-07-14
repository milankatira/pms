import express from "express";
import { projectController } from "../controllers/projectController";

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getProjectsByUser);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.editProjectById);

export { router as projectRouter };
