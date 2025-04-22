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

module.exports = {
    getProfile
}