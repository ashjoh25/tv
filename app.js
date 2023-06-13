//set up the server
const express = require( "express" );
const app = express();
const port = 3600;
const logger = require("morgan");
const DEBUG = true;
const db = require('./db/db_connection');
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// // Load Node modules
// // Render static files
// app.use(express.static('public'));

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('index');
});

// // define middleware that logs all incoming requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// } );

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));


// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index" );
} );

// define a route for the assignment list page
app.get( "/user_profile", ( req, res ) => {
    res.sendFile( __dirname + "/views/user_profile" );
} );


// define a route for the assignment list page
const read_newrank_all_sql = `
    SELECT 
        show_id, name, description, shows.genre_id as genre_id
    FROM shows
    JOIN genres
        ON shows.genre_id = genres.genre_id
`
app.get( "/add_ranking", ( req, res ) => {
    db.execute(read_newrank_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.send(results);
    });
});

// define a route for the assignment detail page
app.get( "/add_ranking/all_rankings", ( req, res ) => {
    res.sendFile( __dirname + "/views/all_rankings" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );





// //set up the server
// const express = require( "express" );
// const app = express();
// const port = 3000;
// const logger = require("morgan");

// app.use(logger("dev"));
// app.use(express.static(__dirname + '/public'));


// // start the server
// app.listen( port, () => {
//     console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
// } );

// // define middleware that logs all incoming requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// } );

// // define a route for the default home page
// app.get( "/", ( req, res ) => {
//     res.sendFile( __dirname + "/index.ejs" );
// } );

// // // define a route for the assignment list page
// // app.get( "/assignments", ( req, res ) => {
// //     res.send( "<h1>This is the assignments list page.</h1>" );
// // } );

// // // define a route for the assignment detail page
// // app.get( "/assignments/detail", ( req, res ) => {
// //     res.send( "<h1>This is the assignment detail page.</h1>" );
// // } );

// // define a route for the default home page
// // app.get( "/", ( req, res ) => {
// //     res.sendFile( __dirname + "/views/index.html" );
// // } );

// // define a route for the assignment list page
// app.get( "/user_profile", ( req, res ) => {
//     res.sendFile( __dirname + "/user_profile.ejs" );
// } );

// // // define a route for the assignment detail page
// // app.get( "/assignments/detail", ( req, res ) => {
// //     res.sendFile( __dirname + "/views/add_ranking.html" );
// // } );