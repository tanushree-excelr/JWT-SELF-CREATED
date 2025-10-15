const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyTokenController } = require('../controllers/authController');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyTokenController);

module.exports = router;
