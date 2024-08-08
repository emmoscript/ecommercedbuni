// /src/app/api/get_products/route.ts
import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const data = await Product.find();
        return NextResponse.json(data);
    } catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            console.error("Error fetching products:", error.message);
            return NextResponse.json(
                {
                    error: error.message,
                    msg: "Something Went Wrong"
                }, 
                { status: 400 }
            );
        } else {
            console.error("Unknown error fetching products:", error);
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
