"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logController = void 0;
const logService_1 = require("../services/logService");
exports.logController = {
    async createLog(req, res) {
        try {
            const { projectId, status, duration, date, note } = req.body;
            const user = req.session.userId; // Assuming you've set the userId in the session during login
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            const log = await logService_1.logService.createLog(user, projectId, status, duration, date, note);
            res.status(201).json({ message: "Log created successfully", log });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
