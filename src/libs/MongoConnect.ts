import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDB = async () => {
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }

    const mongoUri = process.env.MONGODB_URI!;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    return await mongoose.connect(mongoUri);
};
