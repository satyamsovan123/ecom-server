const { commonConstant } = require("../constants/commonConstant");
const Coupon = require("../models/Coupon");

const getAllCoupon = async () => {
  try {
    return await Coupon.find({
      isActive: true,
    })
      .sort({
        percent: -1,
      })
      .limit(1);
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting all coupons from database"),
      data: {},
    };
  }
};

const getCoupon = async (couponId) => {
  try {
    return await Coupon.findOne({ _id: couponId });
  } catch (error) {
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting coupon from database"),
      data: {},
    };
  }
};

module.exports = {
  getAllCoupon,
  getCoupon,
};
