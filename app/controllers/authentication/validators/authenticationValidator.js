const Joi = require("joi");
const { commonConstant } = require("../../../constants/commonConstant");
const authenticationValidator = async (requestBody) => {
  let validationResult = {};
  try {
    const validationSchema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": commonConstant.INVALID_EMAIL,
        "string.empty": commonConstant.INVALID_EMAIL,
        "any.required": commonConstant.INVALID_EMAIL,
      }),
      password: Joi.string().min(6).required().messages({
        "string.min": commonConstant.INVALID_PASSWORD,
        "string.empty": commonConstant.INVALID_PASSWORD,
        "any.required": commonConstant.INVALID_PASSWORD,
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

module.exports = { authenticationValidator };
