import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const DB_URI = process.env.MONGODB_URI;

    if (!DB_URI) {
      throw new Error("MongoDB URI not defined in .env");
    }

    await mongoose.connect(`${DB_URI}/smallData`);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};