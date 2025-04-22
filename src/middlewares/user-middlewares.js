const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error');

const { UserService } = require('../services');
const { User } = require('../models');

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

const validatePatchRequest = (req, res, next) => {
    /*== Check whether all req.body fields is valid or not ==*/

    const allFields = Object.keys(User.rawAttributes);
    const allReqFields = Object.keys(req.body);

    if (!allReqFields.length) {
        ErrorResponse.error = new AppError(["No fields are found in incoming request body to update"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    const invalidFields = allReqFields.filter((field) => !allFields.includes(field));
    if (invalidFields.length > 0) {
        ErrorResponse.data = { invalidFields };
        ErrorResponse.error = new AppError(["Some of the fields are not present that you requested to update"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

async function validatePassword(req, res, next) {
    if (req.body.password) {
        ErrorResponse.error = new AppError('User cannot change setting password directly', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    checkAuth,
    validatePatchRequest,
    validatePassword,
}