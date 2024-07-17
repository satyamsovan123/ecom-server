const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
subscriptionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Subscription", subscriptionSchema);
