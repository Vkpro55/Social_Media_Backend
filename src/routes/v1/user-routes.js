const express = require('express');

const { UserMiddlewares } = require('../../middlewares');
const { UserControllers } = require('../../controllers');

const router = express.Router();

router.get('/profile',
    UserMiddlewares.checkAuth,
    UserControllers.getProfile);

router.patch('/:id',
    UserMiddlewares.checkAuth,
    UserControllers.getProfile);

module.exports = router;