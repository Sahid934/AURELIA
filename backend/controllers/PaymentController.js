exports.processPayment = async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in the order.' });
  }

  // Simulate a 2-second payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  res.json({
    message: 'Payment processed successfully',
    orderId: `AUR-${Math.floor(Math.random() * 1000000)}`,
    total
  });
};
