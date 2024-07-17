const Joi = require("joi");
const { commonConstant } = require("../../../constants/commonConstant");
const refundValidator = async (requestBody) => {
  let validationResult = {};
  try {
    const validationSchema = Joi.object({
      orderId: Joi.string().length(24).required().messages({
        "string.length": commonConstant.INVALID_ORDER_ID,
        "string.empty": commonConstant.INVALID_ORDER_ID,
        "any.required": commonConstant.INVALID_ORDER_ID,
      }),
    }).messages({
      "object.unknown": commonConstant.INVALID_FIELDS,
    });

    await validationSchema.validateAsync(requestBody, {
      abortEarly: false,
    });
    validationResult = { isValid: true, errors: "" };
  } catch (error) {
    const errorMessage = [
      ...new Set(error.details.map((detail) => detail.message)),
    ].join(" ");
    validationResult = { isValid: false, errors: errorMessage };
  }
  return validationResult;
};

module.exports = { refundValidator };
