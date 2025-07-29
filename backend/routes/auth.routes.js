const express = require('express');
const { signUp, logIn, logOut, authMe } = require('../controllers/auth.controller');
const {authMiddleware} = require('../middleware/authMiddlware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);
router.post('/me',authMiddleware, authMe);

module.exports = router;

