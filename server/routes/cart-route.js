const router = require('express').Router();
const cartController = require('./../controller/cart-controller');
const authController = require('./../controller/auth-controller');

router.get('/',
        authController.getLoginMember,
        cartController.getAll
    )

router.route('/:productSku/:quantity')
    .patch(
        authController.getLoginMember,
        cartController.update
    )
// .post('/',
//     authController.getLoginMember,
//     cartController.add
// )

module.exports = router;