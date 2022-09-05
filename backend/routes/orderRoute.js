const express = require("express");
const { newOrder, getSingleOrder, myOrders } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

router.route("/order/new").post(isAuthenticated, newOrder)

router.route("/order/:id").get(isAuthenticated, getSingleOrder)

router.route("/orders/me").get(isAuthenticated, myOrders)

module.exports = router