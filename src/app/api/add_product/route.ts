import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try{

        const body = await request.json();
        const { imgSrc, fileKey, name, category, price} = body;

        // Validate the payload
        if (!imgSrc || !fileKey || !name || !category || !price) {
            return NextResponse.json(
                { error: "Invalid input", msg: "All fields are required" },
                { status: 400 }
            );
        }

        await connectMongoDB()

        const data = await Product.create({
            imgSrc,
            fileKey,
            name,
            category,
            price
        })

        return NextResponse.json({msg: "Product added successfully", data})
    } catch (error) {
        return NextResponse.json(
        {
            error,
            msg: "Something Went Wrong"
        }, {status: 400}
    ); 
    }
}