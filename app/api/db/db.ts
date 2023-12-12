import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const url = process.env.REACT_APP_MONGODB;
  try {
    if (!url) throw Error("Url not provided");
    await mongoose.connect(url), { useNewUrlParser: true, useUnifiedTopology: true };
    console.log("connection successful");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};
