// /app/api/get_transactions/route.ts
import { connectMongoDB } from "@/libs/MongoConnect";
import Transaction from "@/libs/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Transaction.find();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching transactions:", error.message);
      return NextResponse.json(
        {
          error: error.message,
          msg: "Something Went Wrong"
        },
        { status: 400 }
      );
    } else {
      console.error("Unknown error fetching transactions:", error);
      return NextResponse.json(
        {
          error: "Unknown error",
          msg: "Something Went Wrong"
        },
        { status: 400 }
      );
    }
  }
}
