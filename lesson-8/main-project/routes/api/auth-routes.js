const express = require('express');

const router = express.Router();
const authController = require('../../controllers/auth-controller');
const { validateBody } = require('../../utils');
const { schemas } = require('../../models/user');
const { authenticate } = require('../../middlewares');

//signup
router.post('/register', validateBody(schemas.userRegisterShema), authController.register);

router.post('/login', validateBody(schemas.userLoginShema), authController.login)

router.get('/current', authenticate, authController.getCurrent)

router.post('/logout', authenticate, authController.logout)

module.exports = router;
