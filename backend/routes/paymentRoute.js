const express = require('express');
const { processPayment, sendSecretApiKey } = require('../controllers/paymentController');
const { authenticateuser} = require('../middleware/auth');
const router = express.Router();

router.route("/process/payment").post(authenticateuser, processPayment);
router.route("/stripeapikey").get(authenticateuser, sendSecretApiKey);

module.exports = router;