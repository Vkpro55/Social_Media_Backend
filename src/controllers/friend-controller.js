const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const { FriendService } = require('../services');

const sendRequest = async (req, res) => {
    try {
        const senderId = req.user;
        const receiverId = req.params.id;

        const result = await FriendService.sendRequest(senderId, receiverId);

        SuccessResponse.data = result;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
};

async function respondToRequest(req, res) {
    try {
        const receiverId = req.user;
        const senderId = req.params.id;
        const { action } = req.body;

        const result = await FriendService.respondToRequest(receiverId, senderId, action);

        SuccessResponse.data = result;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
};

async function getFriends(req, res) {
    try {
        const friends = await FriendService.getFriends(req.user);

        SuccessResponse.data = friends;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getFriendSuggestions(req, res) {
    try {
        const friends = await FriendService.getFriendSuggestions(req.user);

        SuccessResponse.data = friends;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    sendRequest,
    respondToRequest,
    getFriends,
    getFriendSuggestions
};
