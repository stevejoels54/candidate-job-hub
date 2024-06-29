"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const database_1 = __importDefault(require("./config/database"));
const redisClient_1 = __importDefault(require("./utils/redisClient"));
const winston_1 = __importDefault(require("./config/winston"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/candidates", candidateRoutes_1.default);
// catch all other resourses
app.get("*", (req, res) => res.status(404).send({ message: "Resource Not Found!" }));
// connect to the database
(0, database_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        winston_1.default.info(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    winston_1.default.error("Error connecting to the database: ", error);
    process.exit(1);
});
// check if the redis client is connected
redisClient_1.default.on("connect", () => {
    winston_1.default.info("Redis connected successfully");
});
exports.default = app;
