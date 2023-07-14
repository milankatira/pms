"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = void 0;
const project_1 = __importDefault(require("../models/project"));
exports.projectService = {
    async createProject(name, user) {
        const project = new project_1.default({
            name,
            user: user,
        });
        await project.save();
        return project;
    },
};
