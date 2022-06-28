const router = require('express').Router();
const memberController = require('./../controller/member-controller');
const authController = require('./../controller/auth-controller');
const multer = require('./../middleware/multer');

router.get('/', memberController.getAll);
router.patch('/',
    authController.getLoginMember,
    multer.config.single('avatar'),
    memberController.update
);

module.exports = router;