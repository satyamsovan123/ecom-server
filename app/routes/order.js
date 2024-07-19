const express = require("express");
const router = express.Router();
const { checkAccessToken } = require("../middlewares/checkAccessToken");
const { order } = require("../controllers/order/order");
const { getOrders } = require("../controllers/order/getOrders");
const { refund } = require("../controllers");
const { confirmOrder } = require("../controllers/order/confirmOrder");

router.post("/order", checkAccessToken, order);
router.get("/orders", checkAccessToken, getOrders);
router.patch("/refund", checkAccessToken, refund);
router.patch("/confirm-order", checkAccessToken, confirmOrder);

module.exports = router;
