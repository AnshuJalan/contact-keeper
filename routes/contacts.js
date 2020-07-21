const express = require('express');
const router = express.Router();

// @route GET /api/contacts
// @desc Get all contacts
// @access Private
router.get('/', (req, res) => {
  res.send('Get Contacts!');
});

// @route POST /api/contacts
// @desc Create new contact
// @access Private
router.post('/', (req, res) => {
  res.send('New Contact!');
});

// @route PUT /api/contacts
// @desc Update contact
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update Contac!');
});

// @route DELETE /api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Get Contacts!');
});

module.exports = router;
