const { User } = require('../models');

class AuthRepository {

    async create(data) {
        const response = await User.create(data);
        return response;
    }

    async getUserByEmail(email) {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        return user;
    };
}

module.exports = AuthRepository;