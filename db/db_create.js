const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_shows_table_sql = "DROP TABLE IF EXISTS shows;"

db.execute(drop_shows_table_sql);

const drop_genres_table_sql = "DROP TABLE IF EXISTS genres;"

db.execute(drop_genres_table_sql);

/**** Create tables ****/

const create_genres_table_sql = `
    CREATE TABLE genres (
        genreId INT NOT NULL AUTO_INCREMENT,
        genreName VARCHAR(45) NOT NULL,
        PRIMARY KEY (genreId));
`
db.execute(create_genres_table_sql);

const create_shows_table_sql = `
    CREATE TABLE shows (
        showtId INT NOT NULL AUTO_INCREMENT,
        showTitle VARCHAR(45) NOT NULL,
        genreId INT NOT NULL,
        dayWatched DATE NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (showId),
        INDEX showGenre_idx (genreId ASC),
        CONSTRAINT showGenre
            FOREIGN KEY (genreId)
            REFERENCES genres (genreId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_shows_table_sql);

db.end();
