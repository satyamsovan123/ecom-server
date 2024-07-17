const { commonConstant } = require("../../constants/commonConstant");
const { getAllOrder } = require("../../services/orderService");

const getOrders = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const allOrders = await getAllOrder(req.user._id);
    response.data = allOrders;
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("getting all orders");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { getOrders };
