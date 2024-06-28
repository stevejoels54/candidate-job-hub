import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import candidateRoutes from "./routes/candidateRoutes";
import connectDB from "./config/database";
import redisClient from "./utils/redisClient";
import logger from "./config/winston";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/candidates", candidateRoutes);

// catch all other resourses
app.get("*", (req, res) =>
  res.status(404).send({ message: "Resource Not Found!" })
);

// connect to the database
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Error connecting to the database: ", error);
    process.exit(1);
  });

// check if the redis client is connected
redisClient.on("connect", () => {
  logger.info("Redis connected successfully");
});

export default app;
