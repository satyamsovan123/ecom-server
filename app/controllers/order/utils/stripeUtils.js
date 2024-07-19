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
        error.message || commonConstant.GENERIC_ERROR("processing payment"),
    };
  }
};

const confirmPaymentIntent = async (paymentIntentId) => {
  try {
    return stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error(error);
    throw {
      message:
        error.message || commonConstant.GENERIC_ERROR("confirming payment"),
    };
  }
};

const createReceipt = async (charge) => {
  try {
    const c = await stripe.charges.retrieve(charge);
    return c.receipt_url;
  } catch (error) {
    console.error(error);
    throw {
      message:
        error.message || commonConstant.GENERIC_ERROR("creating receipt"),
    };
  }
};

module.exports = {
  createPaymentIntent,
  createReceipt,
  confirmPaymentIntent,
};
