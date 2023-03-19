const express = require('express');
const { createOrder, getOrders, getSingleOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { authenticateuser, authorizeRole} = require('../middleware/auth');
const router = express.Router();

router.route("/order/new").post(authenticateuser,createOrder);
router.route("/orders").get(authenticateuser,getOrders);
router.route("/order/:id").get(authenticateuser,getSingleOrder);

//ADMIN routes
router.route('/admin/orders').get(authenticateuser,authorizeRole("admin"),getAllOrders);
router.route('/admin/order/:id')
.put(authenticateuser,authorizeRole("admin"),updateOrderStatus)
.delete(authenticateuser,authorizeRole("admin"),deleteOrder);

module.exports = router