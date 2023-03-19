const express = require('express');
const { createuser, loginuser, logoutuser , forgotpassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser} = require('../controllers/userController')
const router = express.Router();
const { authenticateuser, authorizeRole} = require('../middleware/auth');

router.route("/register").post(createuser);
router.route("/login").post(loginuser);
// router.route("/register").post(createuser);
router.route("/password/forgot").post(forgotpassword);
router.route("/user/logout").get(logoutuser);
router.route("/me").get(authenticateuser,getUserDetails);
router.route("/me/updatePassword").put(authenticateuser,updatePassword);
router.route("/me/update").put(authenticateuser,updateProfile);

//ADMIN Routes
router.route("/admin/users").get(authenticateuser,authorizeRole("admin"),getAllUsers);
router.route("/admin/user/:id")
.get(authenticateuser,authorizeRole("admin"),getSingleUser)
.put(authenticateuser,authorizeRole("admin"),updateRole)
.delete(authenticateuser,authorizeRole("admin"),deleteUser);



module.exports = router;