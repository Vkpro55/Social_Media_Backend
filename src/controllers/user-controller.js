const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const { UserService } = require('../services');

async function getProfile(req, res) {
    try {
        const response = await UserService.getProfile(req.user);

        SuccessResponse.data = response;

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

async function updateProfile(req, res) {
    try {
        const response = await UserService.updateProfile(req.user, req.body);

        SuccessResponse.data = response;

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

async function getUsers(req, res) {
    try {
        const users = await UserService.getUsers(req.user);
        SuccessResponse.data = users;

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

async function getUser(req, res) {
    try {
        const users = await UserService.getUser(req.user, req.query.name);
        SuccessResponse.data = users;

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
    getProfile,
    updateProfile,
    getUsers,
    getUser
}