const { commonConstant } = require("../../../constants/commonConstant");
const { getCoupon } = require("../../../services/couponService");
const { getProduct } = require("../../../services/productService");

const generateOrderDetails = async (req) => {
  try {
    const product = await getProduct(req.body.productId);

    // Populate total amount
    let totalAmount = product.price * req.body.quantity;
    if (!totalAmount) {
      throw {
        statusCode: 400,
        message: commonConstant.INVALID_PRODUCT,
        data: {},
      };
    }
    // Populate coupon from coupon id
    let coupon = null;
    if (req.body.couponId) {
      coupon = await getCoupon(req.body.couponId);
      if (!coupon || (coupon && !coupon.isActive)) {
        throw {
          statusCode: 400,
          message: commonConstant.INVALID_COUPON,
          data: {},
        };
      } else {
        // Deduct coupon discount from total amount if coupon is applied
        totalAmount = totalAmount - (totalAmount * coupon.percent) / 100;
      }
    }

    const orderDetails = {
      product: product._id, // Populate product id
      quantity: req.body.quantity, // Populate quantity
      user: req.user._id, // Populate user id from token
      orderStatus: "pending", // Populate status as pending
      paymentStatus: "pending", // Populate payment status as pending
      paymentInfo: "", // Populate paymentInfo as ""
      email: req.user.email, // Populate email from token
      totalAmount: totalAmount, // Populate total amount
      coupon: coupon?._id || null, // Populate coupon id (if applied)
      currency: product.currency, // Populate currency from product
    };

    return orderDetails;
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("generating order details"),
      data: {},
    };
  }
};

module.exports = { generateOrderDetails };
