const express = require("express");

const authRouter = require('./auth-routes');
const userRouter = require('./user-routes');
const friendRouter = require('./friend-routes');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/friend', friendRouter);

module.exports = router;