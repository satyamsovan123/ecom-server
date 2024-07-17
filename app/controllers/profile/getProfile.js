const { commonConstant } = require("../../constants/commonConstant");

const getProfile = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    response.data = req.user;
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("getting profile");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { getProfile };
