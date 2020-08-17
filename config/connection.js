// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// requiring data from .env file, data not going to production
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
// the function accepts the database name, MySQL username, and MySQL password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
  
module.exports = sequelize;