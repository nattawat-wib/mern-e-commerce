const router = require('express').Router();
const addressController = require('./../controller/address-controller');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember);

router.route('/')
    .post(addressController.create)
    .get(addressController.getAll);

router.route('/:_id')
    .patch(addressController.update)
    .delete(addressController.delete)

router.patch('/set-default/:_id', addressController.setDefault)

module.exports = router;