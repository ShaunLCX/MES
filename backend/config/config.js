require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: {
        encrypt: process.env.DIALECT_OPTIONS_ENCRYPT === 'true',
        enableArithAbort: process.env.DIALECT_OPTIONS_ENABLE_ARITH_ABORT === 'true'
      }
    }
  }
};
