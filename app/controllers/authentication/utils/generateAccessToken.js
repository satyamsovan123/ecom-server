const jwt = require("jsonwebtoken");
const { commonConstant } = require("../../../constants/commonConstant");

const generateAccessToken = async (data) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("generating access token"),
      data: {},
    };
  }
};

module.exports = { generateAccessToken };
