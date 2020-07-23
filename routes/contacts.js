const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route GET /api/contacts
// @desc Get all contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error!' });
  }
});

// @route POST /api/contacts
// @desc Create new contact
// @access Private
router.post(
  '/',
  [
    auth,
    [
      body('name', 'Please enter a name!').exists(),
      body('phone', 'Please enter a valid phone number!').isLength(10),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const { name, phone, email, type } = req.body;

      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      res.status(500).json({ msg: 'SERVER ERROR!' });
    }
  }
);

// @route PUT /api/contacts
// @desc Update contact
// @access Private
router.put('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(400).json({ msg: 'Invalid Contact' });
    }

    if (contact.user != req.user.id) {
      return res.status(400).json({ msg: 'Not Authorized!' });
    }

    const { name, email, phone, type } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'SERVER ERROR!' });
  }
});

// @route DELETE /api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(400).json({ msg: 'Invalid Contact' });
    }

    if (contact.user != req.user.id) {
      return res.status(400).json({ msg: 'Not Authorized!' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Removed!' });
  } catch (err) {
    res.status(500).json({ msg: 'SERVER ERROR!' });
  }
});

module.exports = router;
