import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to MongoDB.");
        return mongoose.connection.asPromise();
    }

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB.");
    }
};
