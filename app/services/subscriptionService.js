const { commonConstant } = require("../constants/commonConstant");
const Order = require("../models/Order");

const getAllSubscription = async (userId) => {
  try {
    let subscriptions = await Order.find({ user: userId }).populate({
      path: "product",
      match: { paymentModel: "subscription" },
    });

    subscriptions = subscriptions.filter((subscription) => {
      return subscription.product !== null;
    });

    return subscriptions;
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting all products from database"),
      data: {},
    };
  }
};

const createSubscription = async (subscriptionData) => {
  try {
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("creating new subscription in database"),
      data: {},
    };
  }
};

module.exports = {
  getAllSubscription,
  createSubscription,
};
