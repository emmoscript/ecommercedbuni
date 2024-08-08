import { Schema, model, models } from "mongoose";

const analyticsSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  totalSales: {
    type: Number,
    required: true
  },
  totalOrders: {
    type: Number,
    required: true
  },
  totalProductsSold: {
    type: Number,
    required: true
  },
  topSellingProducts: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantitySold: {
      type: Number,
      required: true
    }
  }]
});

const Analytics = models.Analytics || model("Analytics", analyticsSchema);

export default Analytics;
