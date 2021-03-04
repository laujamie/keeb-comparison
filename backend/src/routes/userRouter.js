const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authMiddleware');
const { initializeUser } = require('../services/firebase-admin');

router.use(isAuthenticated());

router.post('/signup', async (req, res) => {
  const { user } = req;
  await initializeUser(user.sub);
  res.json({
    message: 'User initialized successfully',
  });
});

module.exports(router);
