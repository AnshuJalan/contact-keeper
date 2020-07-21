const express = require('express');
const router = express.Router();

// @route GET /api/auth
// @desc Get logged in user
// @access Private
router.get('/', (req, res) => {
  res.send('Get User!');
});

// @route POST /api/auth
// @desc Authenticate and get token
// @access Private
router.post('/', (req, res) => {
  res.send('Loggin user!');
});

module.exports = router;
