const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { User } = require('../models');

class AuthRepository {

    async get(id) {
        const response = await User.findByPk(id);
        if (!response) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data) {
        const response = await User.update(data, {
            where: {
                id: id
            }
        });

        if ((Array.isArray(response) === true) && (response[0] === 0)) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }

        return response;
    }
}

module.exports = AuthRepository;