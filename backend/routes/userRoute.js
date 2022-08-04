const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getUsers, getOneUser, deleteUser, updateRole } = require("../controllers/userController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticated ,getUserDetails)

router.route("/password/update").put(isAuthenticated, updatePassword)

router.route("/me/update").put(isAuthenticated, updateProfile)

router.route("/admin/users").get(isAuthenticated, authorizedRoles("admin"), getUsers)

router.route("/admin/user/:id").get(isAuthenticated, authorizedRoles("admin"), getOneUser)

router.route("/admin/user/:id").put(isAuthenticated, authorizedRoles("admin"), updateRole)

router.route("/admin/user/:id").delete(isAuthenticated, authorizedRoles("admin"), deleteUser)

module.exports = router