import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

type Data = {
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db();

      // Create collections and insert sample documents
      const usersCollection = db.collection('users');
      const productsCollection = db.collection('products');
      const ordersCollection = db.collection('orders');
      const transactionsCollection = db.collection('transactions');

      await usersCollection.insertOne({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await productsCollection.insertOne({
        name: 'testProduct',
        description: 'A sample product',
        price: 9.99,
        image: 'http://example.com/image.png',
        category: 'supplements',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await ordersCollection.insertOne({
        userId: new ObjectId(),
        products: [
          {
            productId: new ObjectId(),
            quantity: 1,
            price: 9.99,
          },
        ],
        totalPrice: 9.99,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await transactionsCollection.insertOne({
        orderId: new ObjectId(),
        paymentMethod: 'credit card',
        amount: 9.99,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).json({ message: 'Collections and sample documents created successfully' });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: 'Error creating collections', error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
