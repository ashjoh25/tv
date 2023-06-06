const dotenv = require('dotenv');

dotenv.config();

const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000")
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;


// const db = require("./db_connection");
// /**** Delete existing table, if any ****/

// const drop_stuff_table_sql = "DROP TABLE IF EXISTS `stuff`;"

// db.execute(drop_stuff_table_sql);

// /**** Create "stuff" table (again)  ****/

// const create_stuff_table_sql = `
//     CREATE TABLE shows_list (
//         id INT NOT NULL AUTO_INCREMENT,
//         title VARCHAR(100) NOT NULL,
//         genre VARCHAR(100) NOT NULL,
//         rank INT NOT NULL,
//         notes VARCHAR(150) NOT NULL,
//         PRIMARY KEY (id)
//     );
// `
// db.execute(create_stuff_table_sql);


// /**** Create some sample items ****/

// const insert_stuff_table_sql = `
//     INSERT INTO shows_list 
//         (title, genre, rank, notes) 
//     VALUES 
//         (?, ?, ?, ?);
// `
// db.execute(insert_stuff_table_sql, ['show name', 'genre', 'rank', 'notes']);

// const read_stuff_table_sql = "SELECT * FROM shows_list";

// db.execute(read_stuff_table_sql, 
//     (error, results) => {
//         if (error) 
//             throw error;

//         console.log("Table 'shows_list' initialized with:")
//         console.log(results);
//     }
// );

// db.end();