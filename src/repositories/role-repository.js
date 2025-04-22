const { Role } = require("../models");

class RoleRepository {

    async getRoleByName(name) {
        const role = await Role.findOne({
            where: {
                name: name
            }
        });

        return role;
    };

}

module.exports = RoleRepository