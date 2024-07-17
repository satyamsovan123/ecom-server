const { commonConstant } = require("../../../constants/commonConstant");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (orderDetails) => {
  try {
    return await stripe.paymentIntents.create({
      amount: orderDetails.totalAmount * 100,
      currency: orderDetails.currency,
      metadata: {
        orderId: String(orderDetails._id),
        productId: String(orderDetails.product),
      },
      receipt_email: orderDetails.email,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw {
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("processing payment information"),
    };
  }
};

const confirmPayment = async (orderDetails) => {
  try {
  } catch (error) {
    console.error(error);
    throw {
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("processing payment information"),
    };
  }
};

const createReceipt = (orderDetails) => {
  try {
  } catch (error) {
    console.error(error);
    throw {
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("processing payment information"),
    };
  }
};

module.exports = { createPaymentIntent, createReceipt, confirmPayment };
