const { commonConstant } = require("../../constants/commonConstant");
const { generateOrderDetails } = require("./utils/generateOrderDetails");
const {
  createOrder,
  updateOrder,
  confirmOrderAfterPayment,
} = require("../../services/orderService");
const {
  createPaymentIntent,
  confirmPaymentIntent,
  createReceipt,
} = require("./utils/stripeUtils");
const { confirmOrderValidator } = require("./validators/confirmOrderValidator");
const confirmOrder = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const validationResult = await confirmOrderValidator(req.body);
    if (!validationResult.isValid) {
      throw {
        statusCode: 400,
        message: validationResult.errors,
        data: {},
      };
    }

    const paymentConfirmation = await confirmPaymentIntent(
      req.body.paymentInfo
    );

    if (
      !paymentConfirmation ||
      (paymentConfirmation && paymentConfirmation.status !== "succeeded")
    ) {
      throw {
        statusCode: 400,
        message: commonConstant.UNABLE_TO_PROCESS_PAYMENT,
        data: {},
      };
    }

    let updatedOrder = await confirmOrderAfterPayment(req.body.paymentInfo);

    if (!updatedOrder || (updatedOrder && !updatedOrder._id)) {
      throw {
        statusCode: 500,
        message: commonConstant.UNABLE_TO_CREATE_ORDER,
        data: {},
      };
    }

    const receipt = await createReceipt(paymentConfirmation.latest_charge);
    updatedOrder = updatedOrder.toObject();
    updatedOrder["receipt"] = receipt;
    response.data = updatedOrder;

    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("purchasing items");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { confirmOrder };
