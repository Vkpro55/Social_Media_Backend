const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const { REQUEST_RESPONSE_STATUS } = require('../utils/common/enums');
const { ACCEPTED, REJECTED } = REQUEST_RESPONSE_STATUS;

const { FriendRepository } = require('../repositories');
const friendRepository = new FriendRepository();

async function sendRequest(senderId, receiverId) {
    try {
        if (senderId === receiverId) {
            throw new AppError('Cannot send friend request to yourself', StatusCodes.BAD_REQUEST);
        }

        const existingRequest = await friendRepository.alreadyRequested(senderId, receiverId);
        if (existingRequest) {
            throw new AppError('Friend request already sent', StatusCodes.BAD_REQUEST);
        }

        const request = await friendRepository.sendFriendRequest(senderId, receiverId);
        return request;
    } catch (error) {
        throw new AppError('Cannot send request', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function respondToRequest(receiverId, senderId, action) {
    try {
        const validActions = [ACCEPTED, REJECTED];

        if (!validActions.includes(action)) {
            throw new AppError('Invalid action. Use ACCEPT or REJECT.', StatusCodes.BAD_REQUEST);
        }

        const request = await friendRepository.getRequest(senderId, receiverId);
        if (!request) {
            throw new AppError('No pending friend request found.', StatusCodes.NOT_FOUND);
        }

        return await friendRepository.updateRequestStatus(request, action);
    } catch (error) {
        throw new AppError('Cannot respond to request', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFriends(userId) {
    try {
        const connectedFriends = await friendRepository.fetchAcceptedFriends(userId);
        return connectedFriends;
    } catch (error) {
        throw new AppError('Cannot get connected friends', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getFriendSuggestions(userId) {
    try {
        const excludeIds = [];

        const acceptedFriends = await friendRepository.fetchAcceptedFriends(userId);
        acceptedFriends.forEach(friend => {
            excludeIds.push(friend.id);
        });
        excludeIds.push(userId);

        return await friendRepository.findAll(excludeIds);
    } catch (error) {
        console.log("Service Error is :", error);
        throw new AppError('Cannot get suggestion to friends', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    sendRequest,
    respondToRequest,
    getFriends,
    getFriendSuggestions
}

