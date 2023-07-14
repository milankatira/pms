"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./authRoutes");
const projectRoutes_1 = require("./projectRoutes");
const logRoutes_1 = require("./logRoutes");
const router = express_1.default.Router();
exports.indexRouter = router;
router.use("/auth", authRoutes_1.authRouter);
router.use("/projects", projectRoutes_1.projectRouter);
router.use("/logs", logRoutes_1.logRouter);
