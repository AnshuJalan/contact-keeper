const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route GET /api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server Error!' });
  }
});

// @route POST /api/auth
// @desc Authenticate and get token
// @access Private
router.post(
  '/',
  [
    body('email', 'Please enter a valid email!').isEmail(),
    body('password', 'Password is required!').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }

      //SEND TOKEN
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), {}, (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'SERVER ERROR' });
    }
  }
);

module.exports = router;
