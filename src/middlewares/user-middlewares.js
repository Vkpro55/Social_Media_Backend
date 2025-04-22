const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common')

const { UserService } = require('../services');

const checkAuth = async (req, res, next) => {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response; /*== This will indicate down the API's that request is authenticated and this user is authenticated user ==*/
            next();
        }

    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(ErrorResponse);
    }
}

module.exports = {
    checkAuth
}