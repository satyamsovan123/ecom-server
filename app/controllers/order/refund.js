const { commonConstant } = require("../../constants/commonConstant");
const { refundOrder } = require("../../services");
const { refundValidator } = require("./validators/refundValidator");

const refund = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const validationResult = await refundValidator(req.body);
    if (!validationResult.isValid) {
      throw {
        statusCode: 400,
        message: validationResult.errors,
        data: {},
      };
    }

    const refundStatus = await refundOrder(req.body.orderId);
    if (!refundStatus) {
      throw {
        statusCode: 404,
        message: commonConstant.UNABLE_TO_INITIATE_REFUND,
        data: {},
      };
    }

    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("refunding");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { refund };
