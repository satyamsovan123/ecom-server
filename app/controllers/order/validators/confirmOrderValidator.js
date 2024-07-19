const Joi = require("joi");
const { commonConstant } = require("../../../constants/commonConstant");
const confirmOrderValidator = async (requestBody) => {
  let validationResult = {};
  try {
    const validationSchema = Joi.object({
      paymentInfo: Joi.string().required().messages({
        "string.length": commonConstant.INVALID_PAYMENT_INFO,
        "string.empty": commonConstant.INVALID_PAYMENT_INFO,
        "any.required": commonConstant.INVALID_PAYMENT_INFO,
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

module.exports = { confirmOrderValidator };
