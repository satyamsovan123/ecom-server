const bcrypt = require("bcrypt");
const { commonConstant } = require("../../../constants/commonConstant");

const ecryptPassword = async (plainPassword) => {
  try {
    return await bcrypt.hash(
      plainPassword,
      Number(JSON.parse(process.env.BCRYPT_SALT_ROUNDS))
    );
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message || commonConstant.GENERIC_ERROR("encrypting password"),
      data: {},
    };
  }
};

module.exports = { ecryptPassword };
