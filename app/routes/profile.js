const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile/getProfile");
const {
  checkSubscriptionStatus,
} = require("../controllers/profile/checkSubscriptionStatus");
const { checkAccessToken } = require("../middlewares/checkAccessToken");

router.get("/profile", checkAccessToken, getProfile);
router.get("/check-subscription", checkAccessToken, checkSubscriptionStatus);

module.exports = router;
