const { config } = require('dotenv');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

config();

const isDevelopment = process.env.DEVELOPMENT === "true";

const conn_option = {
    database: isDevelopment ? process.env.DB_NAME : process.env.MYSQL_ADDON_DB,
    host: isDevelopment ? process.env.DB_HOST : process.env.MYSQL_ADDON_HOST,
    port: isDevelopment ? process.env.DB_PORT : process.env.MYSQL_ADDON_PORT,
    password: isDevelopment ? process.env.DB_PWD : process.env.MYSQL_ADDON_PASSWORD,
    username: isDevelopment ? process.env.DB_USER : process.env.MYSQL_ADDON_USER,
    dialect: 'mysql',
    logging: isDevelopment, // ensure this is a boolean
};

// console.log(conn_option)


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





