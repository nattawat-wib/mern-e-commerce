const router = require('express').Router();
const authController = require('./../controller/auth-controller');

router.get('/register', authController.register)

module.exports = router;