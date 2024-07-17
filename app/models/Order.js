const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    coupon: {
      type: ObjectId,
      ref: "Coupon",
      required: false,
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled", "refunded"],
    },
    currency: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Order", orderSchema);
