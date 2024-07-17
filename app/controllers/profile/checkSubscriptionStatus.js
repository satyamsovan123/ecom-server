const { commonConstant } = require("../../constants/commonConstant");
const { getAllSubscription } = require("../../services");

const checkSubscriptionStatus = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const allSubscriptions = await getAllSubscription(req.user._id);

    const currentTime = new Date().getTime();

    const validSubscriptions = allSubscriptions.filter((subscription) => {
      const endTime =
        new Date(subscription.createdAt).getTime() +
        subscription.product.validityInDays * 24 * 60 * 60 * 1000;
      return (
        subscription.paymentStatus === "completed" && endTime > currentTime
      );
    });

    if (!validSubscriptions || validSubscriptions.length === 0) {
      throw {
        statusCode: 402,
        message: commonConstant.INVALID_SUBSCRIPTION,
        data: {},
      };
    }

    response.data = validSubscriptions;
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message ||
      commonConstant.GENERIC_ERROR("checking subcription status");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { checkSubscriptionStatus };
