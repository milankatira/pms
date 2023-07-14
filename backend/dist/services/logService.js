"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = void 0;
const log_1 = __importDefault(require("../models/log"));
exports.logService = {
    async createLog(userId, projectId, status, duration, date, note) {
        const log = new log_1.default({
            userId,
            projectId,
            status,
            duration,
            date,
            note,
        });
        await log.save();
        return log;
    },
};
