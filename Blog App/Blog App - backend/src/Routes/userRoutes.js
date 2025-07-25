const express = require('express');
const { registerUser } = require('../controllers/userControllers');
const { login } = require('../controllers/userControllers');

const router = express.Router()

router.post('/register', registerUser)
router.post('/login',login);

module.exports = router;