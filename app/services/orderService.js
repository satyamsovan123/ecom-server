const { commonConstant } = require("../constants/commonConstant");
const Order = require("../models/Order");

const getAllOrder = async (userId) => {
  try {
    return await Order.find({ user: userId })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "coupon",
      })
      .populate({
        path: "product",
      })
      .select("-paymentInfo")
      .sort({
        createdAt: -1,
      });
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting orders from database"),
      data: {},
    };
  }
};

const createOrder = async (orderData) => {
  try {
    const newOrder = await new Order(orderData).save();
    return newOrder;
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("creating new order in database"),
      data: {},
    };
  }
};

const updateOrder = async (orderId, updatedData) => {
  try {
    return await Order.findOneAndUpdate({ _id: orderId }, updatedData, {
      new: true,
    }).select("-paymentInfo");
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("updating order in database"),
      data: {},
    };
  }
};

const refundOrder = async (orderId) => {
  try {
    // Need to add logic if order created more than 7 days ago, then refund will not be processed

    return await Order.findOneAndUpdate(
      { _id: orderId, paymentStatus: "completed" },
      {
        paymentStatus: "refunded",
      },
      {
        new: true,
      }
    ).select("-paymentInfo");
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("updating order in database"),
      data: {},
    };
  }
};

const confirmOrderAfterPayment = async (paymentInfo) => {
  try {
    return await Order.findOneAndUpdate(
      { paymentInfo: paymentInfo },
      { paymentStatus: "completed" },
      {
        new: true,
      }
    ).select("-paymentInfo");
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("updating order in database"),
      data: {},
    };
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  updateOrder,
  refundOrder,
  confirmOrderAfterPayment,
};
