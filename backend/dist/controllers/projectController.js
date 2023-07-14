"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const projectService_1 = require("../services/projectService");
exports.projectController = {
    async createProject(req, res) {
        try {
            const { name, userId } = req.body;
            // Assuming you've set the userId in the session during login
            if (!userId) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            const project = await projectService_1.projectService.createProject(name, userId);
            res
                .status(201)
                .json({ message: "Project created successfully", project });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
