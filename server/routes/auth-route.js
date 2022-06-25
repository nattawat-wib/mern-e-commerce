const router = require('express').Router();
const authController = require('./../controller/auth-controller');

router.post('/register', authController.register)
router.get('/verify-token', authController.verityToken)
router.get('/verify-token-cp', authController.verityTokenCp)

router.patch('/login' ,authController.login)
router.patch('/login-cp' ,authController.loginCp)
router.delete('/logout' ,authController.logout)
router.delete('/logout-cp' ,authController.logoutCp)

module.exports = router;