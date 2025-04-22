const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { User } = require('../models');

class AuthRepository {

    async get(id) {
        const response = await User.findByPk(id);
        if (!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }

        return response;
    }
}

module.exports = AuthRepository;