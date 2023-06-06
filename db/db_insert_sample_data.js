const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_shows_table_sql = "DELETE FROM shows;"

db.execute(delete_shows_table_sql);

const delete_genres_table_sql = "DELETE FROM genres;"

db.execute(delete_genres_table_sql);


/**** Create some sample subjects and assignments ****/

const insert_genre_sql = `
    INSERT INTO genres 
        (genreId, genreName) 
    VALUES 
        (?, ?);
`

db.execute(insert_genre_sql, [1, 'Fantasy']);

db.execute(insert_genre_sql, [2, 'Romance']);

db.execute(insert_genre_sql, [3, 'Drama']);

db.execute(insert_genre_sql, [4, 'Comedy']);


const insert_shows_sql = `
    INSERT INTO shows
        (showTitle, genreId, dayFinished, description) 
    VALUES 
        (?, ?, ?, ?);
`

//subjectId: 2 => 'Math'
db.execute(insert_shows_sql, ['help', 1, '2023-05-26', 
        'Do odd questions in the range #155 - #207 (chapter 11). Remember to show your work!']);

//subjectId: 3 => 'Language'
db.execute(insert_shows_sql, ['pls send help', 3, '2023-06-01', 'asdfgh']);

//subjectId: 1 => 'Comp Sci'
db.execute(insert_shows_sql, ['ahhh', 4, '2023-06-07', 'poiuytree']);

db.end();
