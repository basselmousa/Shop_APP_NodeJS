const express = require('express');
const authController = require('../../controllers/mongooseControllers/auth/authController')
const router = express.Router();

router.get('/login', authController.getLogin)

module.exports = router;
