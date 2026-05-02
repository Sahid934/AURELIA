const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validation');

router.post('/', 
  [
    body('items').isArray().withMessage('Items must be an array'),
    body('total').isNumeric().withMessage('Total must be a number')
  ],
  validateRequest,
  paymentController.processPayment
);

module.exports = router;
