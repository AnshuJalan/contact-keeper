const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  '/',
  [
    body('name', 'Please enter name').not().isEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body(
      'password',
      'Password must have at least 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, password, email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: 'Email already exists!' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //RESPOND WITH TOKEN
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
      res.status(500).json({ error: 'Server Error!' });
    }
  }
);

module.exports = router;
