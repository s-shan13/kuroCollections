const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

router.route("/order/new").post(isAuthenticated, newOrder)

module.exports = router