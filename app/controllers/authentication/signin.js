const {
  authenticationValidator,
} = require("./validators/authenticationValidator");

const { comparePassword } = require("./utils/comparePassword");
const { generateAccessToken } = require("./utils/generateAccessToken");

const { getUser } = require("../../services/userService");
const { commonConstant } = require("../../constants/commonConstant");

const signin = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const validationResult = await authenticationValidator(req.body);
    if (!validationResult.isValid) {
      throw { statusCode: 400, message: validationResult.errors, data: {} };
    }
    const existingUser = await getUser(req.body.email);
    if (!existingUser) {
      throw {
        statusCode: 401,
        message: commonConstant.INVALID_CREDENTIALS,
        data: {},
      };
    }
    const isPasswordValid = await comparePassword(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw {
        statusCode: 401,
        message: commonConstant.INVALID_CREDENTIALS,
        data: {},
      };
    }
    const accessToken = await generateAccessToken({
      email: existingUser.email,
    });
    return res
      .setHeader(commonConstant.AUTHORIZATION_HEADER, `Bearer ${accessToken}`)
      .status(response.statusCode)
      .send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("signing in");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { signin };
