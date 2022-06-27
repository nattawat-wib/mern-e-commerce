const router = require('express').Router();
const cartController = require('./../controller/cart-controller');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember)

router.get('/', cartController.getAll)

router.patch('/:productSku/:quantity',cartController.update)

router.delete('/:productSku',cartController.delete)

module.exports = router;