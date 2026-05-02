exports.handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: "I beg your pardon. Could you kindly repeat that?" });
  }

  const lowerMsg = message.toLowerCase();
  let reply = "I am AURELIA's personal concierge. How may I assist you with our collection today?";

  if (lowerMsg.includes('shipping') || lowerMsg.includes('delivery')) {
    reply = "We offer complimentary express shipping globally on all orders. Pieces are typically delivered within 2-3 business days.";
  } else if (lowerMsg.includes('return') || lowerMsg.includes('exchange')) {
    reply = "We accept returns within 30 days of delivery. The piece must be in its original condition. Please use the prepaid return label included in your exquisite packaging.";
  } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
    reply = "Our pieces reflect the pinnacle of craftsmanship and materials. Prices are available on individual product pages. May I help you find something specific?";
  } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    reply = "Good day. Welcome to AURELIA. It is a pleasure to assist you. What are you looking for today?";
  } else if (lowerMsg.includes('coat') || lowerMsg.includes('trench')) {
    reply = "Our outerwear collection is exceptional, particularly the Obsidian Trench. Would you like me to guide you to our outerwear selection?";
  }

  res.json({ reply });
};
