const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    
    res.status(201).json({ message: 'Thank you for your inquiry. An AURELIA associate will be in touch shortly.' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form.' });
  }
};
