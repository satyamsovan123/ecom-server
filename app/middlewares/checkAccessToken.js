const jwt = require("jsonwebtoken");
const { commonConstant } = require("../constants/commonConstant");
const { getUser } = require("../services/userService");

const checkAccessToken = async (req, res, next) => {
  const response = {
    statusCode: 401,
    message: commonConstant.INVALID_CREDENTIALS,
    data: {},
  };
  try {
    const token =
      req.headers?.[commonConstant.AUTHORIZATION_HEADER.toLowerCase()]?.split(
        " "
      )[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await getUser(decodedData.email);
    if (!existingUser) {
      throw {
        statusCode: 401,
        message: commonConstant.INVALID_CREDENTIALS,
        data: {},
      };
    }

    req.user = { email: existingUser.email, _id: existingUser._id };
    next();
  } catch (error) {
    response.statusCode = error.statusCode || 401;
    response.message = commonConstant.GENERIC_ERROR("checking access token");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { checkAccessToken };
