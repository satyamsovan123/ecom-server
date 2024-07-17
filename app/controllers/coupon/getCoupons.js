const { commonConstant } = require("../../constants/commonConstant");
const { getAllCoupon } = require("../../services/couponService");

const getCoupons = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const allCoupons = await getAllCoupon();
    response.data = allCoupons;
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("getting all coupons");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { getCoupons };
