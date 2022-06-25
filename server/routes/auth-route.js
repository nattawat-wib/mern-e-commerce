const router = require('express').Router();
const authController = require('./../controller/auth-controller');

router.post('/register', authController.register)
router.get('/verify-token', authController.verityToken)

router.patch('/login' ,authController.login)
router.patch('/login-cp' ,authController.loginCp)
router.delete('/logout' ,authController.logout)

module.exports = router;