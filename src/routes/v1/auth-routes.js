const express = require('express');

const { AuthMiddlewares } = require('../../middlewares');
const { AuthControllers } = require('../../controllers');

const router = express.Router();

router.post('/signup',
    AuthMiddlewares.validateSingupRequest,
    AuthControllers.singup)

router.post('/login',
    AuthControllers.login);

module.exports = router;