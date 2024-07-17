const commonConstant = {
  INVALID_ROUTE: "Invalid route. Please check the URL.",
  AUTHORIZATION_HEADER: "Authorization",
  INVALID_EMAIL: "Please provide a valid email.",
  INVALID_PASSWORD: "Please provide a valid password of at least 6 characters.",
  INVALID_FIELDS: "Please do not provide extra information.",
  INVALID_CREDENTIALS: "Please provide valid credentials.",
  USER_ALREADY_EXISTS: "Please sign in or use another email to sign up.",
  INVALID_PAYMENT_INFO: "Please provide valid payment information.",
  INVALID_PRODUCT: "Please provide valid product.",
  INVALID_COUPON: "Please provide valid coupon.",
  UNABLE_TO_CREATE_ORDER: "Unable to create order.",
  UNABLE_TO_PROCESS_PAYMENT: "Unable to process payment.",
  INVALID_CURRENCY: "Please provide valid currency.",
  INVALID_QUANTITY: "Please provide valid quantity greater than 0.",
  INVALID_ORDER_ID: "Please provide valid order ID.",
  UNABLE_TO_INITIATE_REFUND: "Unable to initiate refund.",
  INVALID_SUBSCRIPTION: "Please subscribe to access.",
  GENERIC_ERROR: (layer) =>
    `Some error occurred${
      layer ? ` while ${layer}` : ""
    }. Please try again later.`,
  USER_NOT_FOUND: "User not found.",

  GENERIC_SUCCESS: "Successful!",
};

module.exports = { commonConstant };
