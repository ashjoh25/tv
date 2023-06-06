// const mysql = require('mysql2');

// const dbConfig = {
//     host: "sqlclassdb-instance-1.cqjxl5z5vyvr.us-east-2.rds.amazonaws.com",
//     port: 3306,
//     user: "ashjoh25",
//     password: "5dU39qAuNgtK",
//     database: "New SQL Class User",
//     connectTimeout: 10000
// }

// const connection = mysql.createConnection(dbConfig);

// module.exports = connection;

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.Db_CONNECT_TIMEOUT || "10000")
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;