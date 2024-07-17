const { commonConstant } = require("../../constants/commonConstant");
const { getAllProduct } = require("../../services/productService");

const getProducts = async (req, res) => {
  const response = {
    statusCode: 200,
    message: commonConstant.GENERIC_SUCCESS,
    data: {},
  };
  try {
    const allProducts = await getAllProduct();
    response.data = allProducts;
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response.statusCode = error.statusCode || 500;
    response.message =
      error.message || commonConstant.GENERIC_ERROR("getting all products");
    console.error(error);
    return res.status(response.statusCode).send(response);
  }
};

module.exports = { getProducts };
