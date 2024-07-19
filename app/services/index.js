const { createUser, getUser } = require("./userService");
const {
  getAllOrder,
  createOrder,
  updateOrder,
  refundOrder,
  confirmOrderPayment,
} = require("./orderService");
const { getAllCoupon, getCoupon } = require("./couponService");
const { getAllProduct, getProduct } = require("./productService");
const {
  getAllSubscription,
  createSubscription,
} = require("./subscriptionService");

module.exports = {
  createUser,
  getUser,
  updateOrder,
  getAllCoupon,
  getAllProduct,
  getAllOrder,
  createOrder,
  getCoupon,
  getProduct,
  refundOrder,
  getAllSubscription,
  createSubscription,
  confirmOrderPayment,
};
