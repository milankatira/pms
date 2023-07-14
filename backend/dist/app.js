"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use("/", routes_1.indexRouter);
(0, mongoose_1.connect)(process.env.MONGODB_URI || "mongodb://localhost/myapp", {})
    .then(() => {
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
})
    .catch((error) => console.error(error));
