const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validation');

router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validateRequest,
  contactController.submitContact
);

module.exports = router;
