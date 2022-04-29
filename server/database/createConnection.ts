import mongoose from "mongoose";

export async function createConnectionAndInitialize(dbUrl: string) {
  try {
    await mongoose.connect(dbUrl);

    console.log("DB connected");
  } catch (error) {
    console.error("DB not connected", error);
  }
}

export async function closeConnection() {
  try {
    mongoose.connection.close();
    console.log("DB disconnected");
  } catch (error) {
    console.error("DB failed to disconnect", error);
  }
}
