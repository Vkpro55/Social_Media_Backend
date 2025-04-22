const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const { AuthService } = require('../services');

async function singup(req, res) {
    try {
        const user = await AuthService.signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;

        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function login(req, res) {
    try {
        const user = await AuthService.login({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;

        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    singup,
    login
}