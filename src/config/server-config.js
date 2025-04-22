const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALTROUNDS: process.env.SALTROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
}