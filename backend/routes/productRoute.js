const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

const router = express.Router();



router.route("/products").get(isAuthenticated,authorizedRoles("admin"),getAllProducts)

//Create product (Admin)
router.route("/product/new").post(isAuthenticated,createProduct)

//Update product (Admin)
router.route("/product/:id").put(isAuthenticated,updateProduct)

//Delete product (Admin)
router.route("/product/:id").delete(isAuthenticated, deleteProduct)

router.route("/product/:id").get(getProductDetails)

module.exports = router