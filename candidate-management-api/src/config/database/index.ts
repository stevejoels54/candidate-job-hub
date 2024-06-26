import dotenv from "dotenv";
import sequelize from "./sqldb";
import connectMongoDB from "./nosqldb";
import logger from "../winston";

dotenv.config();

const databaseType = process.env.DATABASE_TYPE;

if (!databaseType) {
  throw new Error("DATABASE_TYPE environment variable is not set");
}

const connectDB = async () => {
  if (databaseType === "SQL") {
    await sequelize.sync();
    logger.info("SQL database connected successfully");
  } else if (databaseType === "NoSQL") {
    await connectMongoDB();
  } else {
    throw new Error(`Unsupported DATABASE_TYPE: ${databaseType}`);
  }
};

export default connectDB;
