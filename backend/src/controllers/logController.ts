import { Request, Response } from "express";
import { logService } from "../services/logService";

export const logController = {
  async createLog(req: any, res: Response): Promise<void> {
    try {
      const { projectId, status, duration, date, note } = req.body;
      const userId = req.user.userId;

      if (!userId) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const log = await logService.createLog(
        userId,
        projectId,
        status,
        duration,
        date,
        note
      );

      res.status(201).json({ message: "Log created successfully", log });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async editLog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { projectId, status, duration, date, note } = req.body;

      const updatedLog = await logService.editLog(id, {
        projectId,
        status,
        duration,
        date,
        note,
      });

      if (!updatedLog) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Log updated successfully", log: updatedLog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getLog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const log = await logService.getLogById(id);

      if (!log) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      res.status(200).json({ log });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllLogs(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const { page, limit } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;

      if (!userId) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const logs = await logService.getLogsByUserId(
        userId,
        pageNumber,
        limitNumber
      );

      res.status(200).json({ logs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getLogsByDateRange(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ error: "Invalid date range" });
        return;
      }

      const logs = await logService.getLogsPerDay();

      res.status(200).json({ logs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getStatusCounts(req: Request, res: Response): Promise<void> {
    try {
      const statusCounts = await logService.getStatusCounts();

      res.status(200).json({ statusCounts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteLogById(req: Request, res: Response): Promise<void> {
    try {
      const logId = req.params.id;

      const deleted = await logService.deleteLogById(logId);

      if (!deleted) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      res.status(200).json({ message: "Log deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
