const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error');

async function validateSingupRequest(req, res, next) {

    if (!req.body) {
        ErrorResponse.message = 'Something went wrong while singup user';
        ErrorResponse.error = new AppError('User data not found in the incoming request', StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.name) {
        ErrorResponse.message = 'Something went wrong while singup user';
        ErrorResponse.error = new AppError('User name not found in the incoming request', StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.email) {
        ErrorResponse.message = 'Something went wrong while singup user';
        ErrorResponse.error = new AppError('User email not found in the incoming request', StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.password) {

        ErrorResponse.message = "Something went wrong while singup user.";
        ErrorResponse.error = new AppError(["User password not found in the incoming request."], StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateSingupRequest
}