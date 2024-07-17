const express = require("express");
const router = express.Router();
const { checkAccessToken } = require("../middlewares/checkAccessToken");
const { order } = require("../controllers/order/order");
const { getOrders } = require("../controllers/order/getOrders");
const { refund } = require("../controllers");

router.post("/order", checkAccessToken, order);
router.get("/orders", checkAccessToken, getOrders);
router.patch("/refund", checkAccessToken, refund);

module.exports = router;
