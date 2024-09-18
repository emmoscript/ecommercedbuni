import Stripe from 'stripe';
import { connectMongoDB } from "@/libs/MongoConnect";
import Transaction from "@/libs/models/Transaction";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    await connectMongoDB();

    try {
      const body = await req.json();
      const { amount, customer, email, phone, address, items } = body;
  
      if (!amount || !customer || !email || !phone || !address || !items) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Create PaymentIntent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100, // amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
        description: `Payment for customer ${customer}`,
        metadata: {
          customer_email: email,
          customer_phone: phone, // Send the phone number to Stripe
          shipping_address: address,
        },
      });
  
      // Save the transaction in MongoDB
      const transaction = new Transaction({
        id: paymentIntent.id,
        date: new Date().toISOString(),
        amount: parseInt(amount),
        status: 'pending',
        method: 'card',
        description: `Payment for ${items} items.`,
        customer,
        email,
        phone, // Store the phone number in the transaction
        address,
        items: parseInt(items),
      });
  
      await transaction.save();
  
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error('PaymentIntent creation error: ', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}