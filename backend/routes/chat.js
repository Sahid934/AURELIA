const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validation');

router.post('/',
  [
    body('message').notEmpty().withMessage('Message is required')
  ],
  validateRequest,
  chatController.handleChat
);

module.exports = router;
