const { signin } = require("./authentication/signin");
const { signup } = require("./authentication/signup");

const { getCoupons } = require("./coupon/getCoupons");
const { getProducts } = require("./product/getProducts");

const { order } = require("./order/order");
const { getOrders } = require("./order/getOrders");
const {
  checkSubscriptionStatus,
} = require("./profile/checkSubscriptionStatus");
const { refund } = require("./order/refund");

module.exports = {
  signin,
  signup,

  getProducts,
  getCoupons,

  order,
  getOrders,
  checkSubscriptionStatus,
  refund,
};
