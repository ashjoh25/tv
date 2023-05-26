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

const dbConfig = {
    host: "<hostname>",
    port: 3306,
    user: "<username>",
    password: "<password>",
    database: "<schema>",
    connectTimeout: 10000
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;