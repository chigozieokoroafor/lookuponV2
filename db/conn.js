const { config } = require('dotenv');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

config();

const conn_option = {
    database: process.env.MYSQL_ADDON_DB,
    host: process.env.MYSQL_ADDON_HOST,
    port: process.env.MYSQL_ADDON_PORT,
    password: process.env.MYSQL_ADDON_PASSWORD,
    username: process.env.MYSQL_ADDON_USER,
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true' // ensure this is a boolean
};

// console.log(conn_option);

// async function createDatabaseIfNotExists() {
//     const connection = await mysql.createConnection({
//         host: conn_option.host,
//         port: conn_option.port,
//         user: conn_option.username,
//         password: conn_option.password,
//     });

//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${conn_option.database}\`;`);
//     await connection.end();
// }


// createDatabaseIfNotExists();

const sequelize = new Sequelize(conn_option.database, conn_option.username, conn_option.password, {
        host: conn_option.host,
        port: conn_option.port,
        dialect: conn_option.dialect,
        logging: conn_option.logging,
    });

async function authenticate(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

authenticate()

module.exports = {
        conn: sequelize
};





