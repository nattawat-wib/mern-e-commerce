const router = require('express').Router();
const orderController = require('./../controller/order-controller');
const validate = require('./../middleware/validate');
const authController = require('./../controller/auth-controller');
const multer = require('./../middleware/multer');

router.use(authController.getLoginMember)

router.route('/')
    .post(
        validate.order,
        orderController.create
    )
    .get(orderController.getAll)

router.route('/:orderNumber')
    .get(orderController.getOne)

router.patch('/confirm-slip/:orderNumber',
    multer.config.single('slip'),
    orderController.confirmSlip
)

module.exports = router