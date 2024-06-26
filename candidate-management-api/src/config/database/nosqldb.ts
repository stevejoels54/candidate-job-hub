import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../winston";

dotenv.config();
// Get the environment type from the .env file: development, production, or test
const env = process.env.NODE_ENV || "development";
const databaseUrl =
  env === "test"
    ? process.env.NOSQL_DATABASE_URL_TEST
    : process.env.NOSQL_DATABASE_URL;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(databaseUrl!);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectMongoDB;
