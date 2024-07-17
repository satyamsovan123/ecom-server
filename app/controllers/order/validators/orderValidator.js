const Joi = require("joi");
const { commonConstant } = require("../../../constants/commonConstant");
const orderValidator = async (requestBody) => {
  let validationResult = {};
  try {
    const validationSchema = Joi.object({
      productId: Joi.string().length(24).required().messages({
        "string.length": commonConstant.INVALID_PRODUCT,
        "string.empty": commonConstant.INVALID_PRODUCT,
        "any.required": commonConstant.INVALID_PRODUCT,
      }),
      couponId: Joi.string().length(24).optional().messages({
        "string.length": commonConstant.INVALID_COUPON,
        "string.empty": commonConstant.INVALID_COUPON,
      }),
      quantity: Joi.number().integer().positive().required().messages({
        "number.base": commonConstant.INVALID_QUANTITY,
        "number.positive": commonConstant.INVALID_QUANTITY,
        "number.integer": commonConstant.INVALID_QUANTITY,
        "number.empty": commonConstant.INVALID_QUANTITY,
        "any.required": commonConstant.INVALID_QUANTITY,
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

module.exports = { orderValidator };
