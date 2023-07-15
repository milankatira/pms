import { Request, Response } from "express";
import { projectService } from "../services/projectService";

export const projectController = {
  async createProject(req: any, res: Response): Promise<void> {
    try {
      const { name, status, description } = req.body;
      if (!req.user.userId) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const project = await projectService.createProject(
        name,
        status,
        description,
        req.user.userId
      );

      res
        .status(201)
        .json({ message: "Project created successfully", project });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getProjectsByUser(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.userId;
      if (!userId) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const projects = await projectService.getProjectsByUser(userId);

      res.status(200).json({ projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await projectService.getProjects();
      res.status(200).json({ projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      const project = await projectService.getProjectById(projectId);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getProjectsAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const project = await projectService.getProjectsAnalytics();
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getProjectsAnalyticsAll(req: Request, res: Response): Promise<void> {
    try {
      const project = await projectService.getProjectsAnalyticsAll();
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async editProjectById(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      const { name, status, description } = req.body;
      const updatedProject = await projectService.editProjectById(
        projectId,
        name,
        status,
        description
      );
      if (!updatedProject) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
