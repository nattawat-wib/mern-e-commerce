const router = require('express').Router();
const orderController = require('./../controller/order-controller');
const validate = require('./../middleware/validate');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember)

router.route('/')
    .post(
        validate.order,
        orderController.create
    )
    .get(orderController.create)

module.exports = router