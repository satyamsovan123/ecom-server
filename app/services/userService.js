const { commonConstant } = require("../constants/commonConstant");
const User = require("../models/User");

const createUser = async (userData) => {
  try {
    return await new User(userData).save();
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("creating new user in database"),
      data: {},
    };
  }
};

const getUser = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting existing user from database"),
      data: {},
    };
  }
};

module.exports = { createUser, getUser };
