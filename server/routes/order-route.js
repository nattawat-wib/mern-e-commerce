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

router.patch('/upload-slip/:orderNumber',
    multer.config.single('slip'),
    orderController.uploadSlip
)
router.patch('/confirm-payment/:orderNumber',orderController.confirmPayment)
router.patch('/confirm-shipping/:orderNumber',orderController.confirmShipping)

module.exports = router