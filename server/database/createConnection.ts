import mongoose from "mongoose";
import logger from "../util/winston";

export async function createConnectionAndInitialize(dbUrl: string) {
  try {
    await mongoose.connect(dbUrl);

    logger.info("DB connected");
  } catch (error) {
    logger.error("DB not connected", error);
  }
}
