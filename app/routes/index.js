const express = require("express");
const { commonConstant } = require("../constants/commonConstant");
const router = express.Router();

const baseURL = "/api/v1";
router.use(baseURL, require("./authentication"));
router.use(baseURL, require("./profile"));
router.use(baseURL, require("./order"));
router.use(baseURL, require("./coupon"));
router.use(baseURL, require("./product"));

router.use("*", (req, res) => {
  const response = {
    statusCode: 404,
    message: commonConstant.INVALID_ROUTE,
    data: {},
  };
  return res.status(response.statusCode).send(response);
});

module.exports = router;
