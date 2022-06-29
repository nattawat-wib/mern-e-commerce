const router = require('express').Router();
const orderController = require('./../controller/order-controller');
const validate = require('./../middleware/validate');
const authController = require('./../controller/auth-controller');
const multer = require('./../middleware/multer');

router.route('/')
    .post(
        authController.getLoginMember,
        validate.order,
        orderController.create
    )
    .get(orderController.getAll)

router.get('/member',
    authController.getLoginMember,
    orderController.getByMember
)

router.get('/:orderNumber',
    authController.getLoginMember,
    orderController.getOne
)

router.patch('/upload-slip/:orderNumber',
    authController.getLoginMember,
    multer.config.single('slip'),
    orderController.uploadSlip
)

router.patch('/confirm-payment/:orderNumber', orderController.confirmPayment)
router.patch('/confirm-shipping/:orderNumber', orderController.confirmShipping)

module.exports = router