const express = require('express');
const router = express.Router();

const { FriendControllers } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');

router.post('/request/:id',
    UserMiddlewares.checkAuth,
    FriendControllers.sendRequest);

router.post('/respond/:id',
    UserMiddlewares.checkAuth,
    FriendControllers.respondToRequest);

router.get('/getFriends',
    UserMiddlewares.checkAuth,
    FriendControllers.getFriends);

router.get('/suggestions',
    UserMiddlewares.checkAuth,
    FriendControllers.getFriendSuggestions);


module.exports = router;
