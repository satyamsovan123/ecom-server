const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentModel: {
      type: String,
      enum: ["subscription", "one-time"],
      required: true,
    },
    validityInDays: {
      type: Number,
      required: false,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
