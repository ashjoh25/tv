const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_shows_table_sql = "DELETE FROM shows;"

db.execute(delete_shows_table_sql);

const delete_genres_table_sql = "DELETE FROM genres;"

db.execute(delete_genres_table_sql);


/**** Create some sample subjects and assignments ****/

const insert_genre_sql = `
    INSERT INTO genres 
        (genreName) 
    VALUES 
        (?);
`

db.execute(insert_genre_sql, ['Fantasy']);

db.execute(insert_genre_sql, ['Romance']);

db.execute(insert_genre_sql, ['Drama']);

db.execute(insert_genre_sql, ['Comedy']);


const insert_shows_sql = `
    INSERT INTO shows
        (name, genre_id, description) 
    VALUES 
        (?, ?, ?);
`

db.execute(insert_shows_sql, ['help', 1, 'help!!!!!!']);

db.execute(insert_shows_sql, ['pls send help', 3, 'asdfgh']);

db.execute(insert_shows_sql, ['ahhh', 4, 'poiuytree']);

db.end();
