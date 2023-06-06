//set up the server
const express = require( "express" );
const app = express();
const port = 3600;
const logger = require("morgan");
const DEBUG = true;

// // define middleware that logs all incoming requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// } );
const db = require('./db/db_connection');

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));


// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the assignment list page
app.get( "/user_profile", ( req, res ) => {
    res.sendFile( __dirname + "/views/user_profile.html" );
} );

// define a route for the assignment list page
app.get( "/add_ranking", ( req, res ) => {
    res.sendFile( __dirname + "/views/add_ranking.html" );
} );

// define a route for the assignment detail page
app.get( "/add_ranking/all_rankings", ( req, res ) => {
    res.sendFile( __dirname + "/views/all_rankings.html" );
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