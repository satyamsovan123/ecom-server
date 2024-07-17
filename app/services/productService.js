const { commonConstant } = require("../constants/commonConstant");
const Product = require("../models/Product");

const getAllProduct = async () => {
  try {
    return await Product.find().sort({
      price: 1,
    });
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting all products from database"),
      data: {},
    };
  }
};

const getProduct = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId });
    return product;
  } catch (error) {
    console.error(error);
    throw {
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        commonConstant.GENERIC_ERROR("getting product from database"),
      data: {},
    };
  }
};

module.exports = {
  getAllProduct,
  getProduct,
};
