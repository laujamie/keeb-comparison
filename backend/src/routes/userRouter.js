const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { createUser } = require('../db/queries/userQueries');

router.use(authMiddleware());

router.post('/signup', (req, res) => {
  const { user } = req;
  createUser(user.email, user.sub)
    .then(() => res.json({ message: 'User created' }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports(router);
