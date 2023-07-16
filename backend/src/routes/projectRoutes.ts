import express from "express";
import { projectController } from "../controllers/projectController";

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getProjectsByUser);
router.get("/all", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.editProjectById);
router.delete("/:id", projectController.deleteProjectById);
router.get("/dashboard/latest", projectController.getProjectsAnalytics);
router.get("/dashboard/all", projectController.getProjectsAnalyticsAll);
export { router as projectRouter };
