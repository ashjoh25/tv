const db = require("./db_connection");
/**** Delete existing table, if any ****/

const drop_shows_table_sql = "DROP TABLE IF EXISTS `shows`;"

db.execute(drop_shows_table_sql);

const drop_genres_table_sql = "DROP TABLE IF EXISTS `genres`;"

db.execute(drop_genres_table_sql);


const create_genres_table_sql = `
    CREATE TABLE genres (
        genre_id INT NOT NULL AUTO_INCREMENT,
        genreName VARCHAR(45) NOT NULL,
        PRIMARY KEY (genre_id));
`
db.execute(create_genres_table_sql);

const create_shows_table_sql = `
    CREATE TABLE shows (
        show_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        genre_id INT,
        description VARCHAR(150) NULL,
        ranking INT(5),
        user_id VARCHAR(100) NULL,
        PRIMARY KEY (show_id)
        INDEX showsxgenres (genre_id ASC),
        CONSTRAINT showsxgenres
            FOREIGN KEY (genre_id)
            REFERENCES genres (genre_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_shows_table_sql);

/**** Create some sample items ****/

// const insert_stuff_table_sql = `
//     INSERT INTO stuff 
//         (item, due_date, classes, description) 
//     VALUES 
//         (?, ?, ?, ?);
// `
// db.execute(insert_shows_table_sql, ['Chem Webassign', '1/9/23', 'Chemistry', 'ahhh chem']);

// db.execute(insert_shows_table_sql, ['Infix Calculator', '1/6/23', 'AP CompSci', 'yayay']);

// db.execute(insert_shows_table_sql, ['Gatsby Essay', '2/3/23', 'AmerLit', 'boooks']);

// db.execute(insert_shows_table_sql, ['American Revolution Presentation', '2/10/23', 'History', 'boop']);

const read_shows_table_sql = "SELECT * FROM shows";

db.execute(read_shows_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'shows' initialized with:")
        console.log(results);
    }
);

db.end();