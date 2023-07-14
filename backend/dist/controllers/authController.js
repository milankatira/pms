"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const authService_1 = require("../services/authService");
exports.authController = {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const user = new user_1.default({
                email,
                password: hashedPassword,
            });
            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await user_1.default.findOne({ email });
            if (!user) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
            const token = authService_1.authService.generateToken(user);
            req.session.token = token;
            res.status(200).json({ token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async logout(req, res) {
        try {
            req.session.destroy((error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                }
                res.status(200).json({ message: "Logged out successfully" });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
