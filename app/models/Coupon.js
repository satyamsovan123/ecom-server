const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
couponSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Coupon", couponSchema);
