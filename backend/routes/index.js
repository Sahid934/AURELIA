const express = require('express');
const router = express.Router();
const productRoutes = require('./products');
const paymentRoutes = require('./payment');
const contactRoutes = require('./contact');
const chatRoutes = require('./chat');

router.use('/products', productRoutes);
router.use('/payment', paymentRoutes);
router.use('/contact', contactRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
