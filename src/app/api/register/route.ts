import User from "@/libs/models/User";
import connectMongoDB from "@/libs/MongoConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const { email, password, username } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return new NextResponse("Email and password are required", { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    // Optional: Check if username is provided and unique
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return new NextResponse("Username is already in use", { status: 400 });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username: username || null, // Ensure username is handled correctly
    });

    // Save the user to the database
    await newUser.save();
    
    return new NextResponse("User is registered", { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("An error occurred during registration.", { status: 500 });
  }
};
