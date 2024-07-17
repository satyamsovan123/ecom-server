const { commonConstant } = require("../../constants/commonConstant");
const { orderValidator } = require("./validators/orderValidator");
const { generateOrderDetails } = require("./utils/generateOrderDetails");
const { createOrder, updateOrder } = require("../../services/orderService");
const { createPaymentIntent } = require("./utils/stripeUtils");

const order = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const validationResult = await orderValidator(req.body);
    if (!validationResult.isValid) {
      throw {
        statusCode: 400,
        message: validationResult.errors,
        data: {},
      };
    }

    // Generate order data
    const orderData = await generateOrderDetails(req);
    // Create new order
    const newOrder = await createOrder(orderData);
    if (!newOrder || (newOrder && !newOrder._id)) {
      throw {
        statusCode: 500,
        message: commonConstant.UNABLE_TO_CREATE_ORDER,
        data: {},
      };
    }

    console.log(newOrder);

    /* 
   ----- Commenting out as Stripe is out of scope (they are reducing operations in India from May 2024) -----

    // Stripe integration
    const paymentIntent = await createPaymentIntent(newOrder);
    if (!paymentIntent || (paymentIntent && !paymentIntent.id)) {
      throw {
        statusCode: 500,
        message: commonConstant.UNABLE_TO_PROCESS_PAYMENT,
        data: {},
      };
    }

    // Check payment status and update payment status
    let paymentStatus = "";
    switch (paymentIntent.status) {
      case "requires_payment_method":
        paymentStatus = "pending";
        break;
      case "requires_confirmation":
        paymentStatus = "pending";
        break;
      case "succeeded":
        paymentStatus = "completed";
        break;
      case "requires_action":
        paymentStatus = "pending";
        break;
      case "processing":
        paymentStatus = "pending";
        break;
      case "requires_capture":
        paymentStatus = "pending";
        break;
      case "canceled":
        paymentStatus = "cancelled";
        break;
      default:
        paymentStatus = "pending";
        break;
    }

    let updatedOrder = await updateOrder(newOrder._id, {
      paymentInfo: paymentIntent.id, // Populate paymentInfo with paymentIntent.id
      paymentStatus: paymentStatus, // Populate paymentStatus
    });

    if (!updatedOrder || (updatedOrder && !updatedOrder._id)) {
      throw {
        statusCode: 500,
        message: commonConstant.UNABLE_TO_CREATE_ORDER,
        data: {},
      };
    }
    // Send clientSecret
    const clientSecret = paymentIntent.client_secret;
    updatedOrder = updatedOrder.toObject();
    updatedOrder["clientSecret"] = clientSecret;
    response.data = updatedOrder;
    */

    response.data = orderData;
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("purchasing items");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { order };
