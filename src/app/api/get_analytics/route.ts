// src/app/api/get_analytics/route.ts

import { connectMongoDB } from "@/libs/MongoConnect";
import Transaction from "@/libs/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const transactions = await Transaction.find();

        const totalAmount = transactions.reduce((sum, txn) => sum + parseFloat(txn.amount.replace('$', '')), 0);
        const completedCount = transactions.filter(txn => txn.status === 'Completed').length;
        const pendingCount = transactions.filter(txn => txn.status === 'Pending').length;
        const failedCount = transactions.filter(txn => txn.status === 'Failed').length;

        return NextResponse.json({
            totalAmount,
            completedCount,
            pendingCount,
            failedCount,
            topSellingProducts: [
                { productId: 'Protein', quantitySold: 150 },
                { productId: 'BCAAs', quantitySold: 100 },
                { productId: 'Creatine', quantitySold: 75 },
                { productId: 'Snacks', quantitySold: 200 },
            ],
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching analytics:", error.message);
            return NextResponse.json({ error: error.message, msg: "Something Went Wrong" }, { status: 400 });
        } else {
            console.error("Unknown error fetching analytics:", error);
            return NextResponse.json({ error: "Unknown error", msg: "Something Went Wrong" }, { status: 400 });
        }
    }
}
