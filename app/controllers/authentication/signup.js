const {
  authenticationValidator,
} = require("./validators/authenticationValidator");

const { ecryptPassword } = require("./utils/ecryptPassword");
const { generateAccessToken } = require("./utils/generateAccessToken");

const { createUser, getUser } = require("../../services/userService");
const { commonConstant } = require("../../constants/commonConstant");

const signup = async (req, res) => {
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
    if (existingUser) {
      throw {
        statusCode: 409,
        message: commonConstant.USER_ALREADY_EXISTS,
        data: {},
      };
    }

    const newUser = await createUser({
      email: req.body.email,
      password: await ecryptPassword(req.body.password),
    });
    const accessToken = await generateAccessToken({ email: newUser.email });
    return res
      .setHeader(commonConstant.AUTHORIZATION_HEADER, `Bearer ${accessToken}`)
      .status(response.statusCode)
      .send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("signing up");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { signup };
