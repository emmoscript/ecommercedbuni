import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  items: {
    type: Number,
    required: true
  }
});

const Transaction = models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
