const express = require('express');
const router = express.Router();

const {
  isAuthenticated,
  isAuthorized,
} = require('../middleware/authMiddleware');
const { postSwitch, verifySwitch } = require('../controllers/switchController');

router.use(isAuthenticated());

router.post('/', postSwitch);

router.post('/:id/verify', isAuthorized(['admin']), verifySwitch);

module.exports(router);
