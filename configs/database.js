import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    if(dbConnect.connection.readyState !== 1) {
      throw new Error("Failed to connect to MongoDB");
    }   
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

