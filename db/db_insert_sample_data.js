const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_shows_table_sql = "DELETE FROM shows;"

db.execute(delete_shows_table_sql);

const delete_genres_table_sql = "DELETE FROM genres;"

db.execute(delete_genres_table_sql);

/**** Create some sample subjects and assignments ****/

const insert_genres_sql = `
    INSERT INTO genres 
        (genre_id, genreName) 
    VALUES 
        (?, ?);
`

db.execute(insert_genres_sql, [1, 'Fantasy']);

db.execute(insert_genres_sql, [2, 'Romance']);

db.execute(insert_genres_sql, [3, 'Action']);

db.execute(insert_genres_sql, [4, 'Comedy']);

db.execute(insert_genres_sql, [5, 'Drama']);



const insert_shows_sql = `
    INSERT INTO shows
        (name, genre_id, description, ranking) 
    VALUES 
        (?, ?, ?, ?);
`

//subjectId: 2 => 'Math'
db.execute(insert_shows_sql, ['The Glory', 5, 'really good', 4]);

//subjectId: 3 => 'Language'
db.execute(insert_shows_sql, ['The Office', 4, 'funny', 3]);

//subjectId: 1 => 'Comp Sci'
db.execute(insert_shows_sql, ['NCIS', 3, 'kinda boring', 2]);

db.end();