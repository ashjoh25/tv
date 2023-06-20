const DEBUG = true;

//set up the server
const express = require( "express" );
const logger = require("morgan");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db/db_connection');
const app = express();
const port = 3000;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

//Configure auth 
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.AUTH0_SECRET,
//     baseURL: process.env.AUTH0_BASE_URL,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
// };
// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // define middleware that appends useful auth-related information to the res object
// // so EJS can easily access it
// app.use((req, res, next) => {
//     res.locals.isLoggedIn = req.oidc.isAuthenticated();
//     res.locals.user = req.oidc.user;
//     next();
// })

// // req.isAuthenticated is provided from the auth router
// app.get('/authtest', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// define a route for the default home page
// Root Route
app.get( "/", ( req, res ) => {
    res.render('index');
} );

// // define a route for the assignment list page
// app.get( "/index/user_profile", ( req, res ) => {
//     res.sendFile( __dirname + "/views/user_profile" );
// } );
app.get( "/user_profile", ( req, res ) => {
    res.render("user_profile")
});

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
            res.render("add_ranking")
    });
});

// define a route for the assignment detail page
const read_all_rankings_sql = `
    SELECT
        name, shows.genre_id, description
    FROM shows
    JOIN genres
        ON shows.genre_id = genres.genre_id
`
app.get( "/add_ranking/all_rankings", ( req, res ) => {
    db.execute(read_all_rankings_sql, [1], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.render("all_rankings")
    });
});

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