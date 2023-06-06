const express = require('express');

const router = express.Router();
const authController = require('../../controllers/auth-controller');
const { validateBody } = require('../../utils');
const { schemas } = require('../../models/user');
const { authenticate, upload } = require('../../middlewares');

//signup
router.post('/register', validateBody(schemas.userRegisterShema), authController.register);

router.get('/verify/:verificationCode', authController.verify);

router.post('/verification', validateBody(schemas.emailSchema), authController.resendVerifyEmail);

router.post('/login', validateBody(schemas.userLoginShema), authController.login)

router.get('/current', authenticate, authController.getCurrent)

router.post('/logout', authenticate, authController.logout)

router.patch('/avatar', authenticate, upload.single('avatar'), authController.updateAvatar);

module.exports = router;
