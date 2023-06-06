const db = require("./db_connection");


/**** Read the subjects table ****/

const select_shows_sql = "SELECT * FROM shows";

db.execute(select_shows_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'shows' contents:")
        console.log(results);
    }
);

/**** Read the assignments table, joined with subjects table ****/


const select_genres_sql = `
SELECT *
FROM genres
JOIN genres
    ON shows.genreId = genres.genreId
ORDER BY
    genres.genreId;
`;

db.execute(select_genres_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'genres' contents:")
        console.log(results);
    }
);

db.end();