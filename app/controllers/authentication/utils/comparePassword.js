const bcrypt = require("bcrypt");
const { commonConstant } = require("../../../constants/commonConstant");

const comparePassword = async (enteredPassword, encryptedPassword) => {
  try {
    return await bcrypt.compare(enteredPassword, encryptedPassword);
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message || commonConstant.GENERIC_ERROR("comparing password"),
      data: {},
    };
  }
};

module.exports = { comparePassword };
