const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, handleReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts)

//Create product (Admin)
router.route("/admin/product/new").post(isAuthenticated,authorizedRoles("admin"),createProduct)

//Update product (Admin)
router.route("/admin/product/:id").put(isAuthenticated,authorizedRoles("admin"),updateProduct)

//Delete product (Admin)
router.route("/admin/product/:id").delete(isAuthenticated,authorizedRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticated, handleReview)

router.route("/reviews").get(getProductReviews).delete(isAuthenticated, authorizedRoles("admin"), deleteReview)

module.exports = router