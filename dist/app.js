"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
    ],
    credentials: true
}));
app.use("/api/v1/", user_route_1.userRoutes);
// app.use("/api", borrowRoute);
app.get("/", (req, res) => {
    res.send("College finder API is running successfully!");
});
exports.default = app;
