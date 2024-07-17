const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/authentication/signin");
const { signup } = require("../controllers/authentication/signup");

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
