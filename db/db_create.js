const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_shows_table_sql = "DROP TABLE IF EXISTS shows;"

db.execute(drop_shows_table_sql);

const drop_genres_table_sql = "DROP TABLE IF EXISTS genres;"

db.execute(drop_genres_table_sql);

/**** Create tables ****/

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
        genre_id INT NOT NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (show_id),
        INDEX showGenre_idx (genre_id ASC),
        CONSTRAINT showGenre
            FOREIGN KEY (genre_id)
            REFERENCES genres (genre_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_shows_table_sql);

db.end();
