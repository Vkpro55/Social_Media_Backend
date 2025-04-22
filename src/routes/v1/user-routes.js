const express = require('express');

const { UserMiddlewares } = require('../../middlewares');
const { UserControllers } = require('../../controllers');

const router = express.Router();

router.get('/getprofile',
    UserMiddlewares.checkAuth,
    UserControllers.getProfile);

router.patch('/updateProfile',
    UserMiddlewares.checkAuth,
    UserMiddlewares.validatePatchRequest,
    UserMiddlewares.validatePassword,
    UserControllers.updateProfile);

router.get("/",
    UserMiddlewares.checkAuth,
    UserControllers.getUsers);


router.get("/search",
    UserMiddlewares.checkAuth,
    UserMiddlewares.validateSearchRequest,
    UserControllers.getUser);

module.exports = router;