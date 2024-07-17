const express = require("express");
const router = express.Router();
const { getCoupons } = require("../controllers/coupon/getCoupons");

router.get("/coupons", getCoupons);

module.exports = router;
