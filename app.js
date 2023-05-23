//set up the server
const express = require( "express" );
const app = express();
const port = 3000;

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/index.html" );
} );

// // define a route for the assignment list page
// app.get( "/assignments", ( req, res ) => {
//     res.send( "<h1>This is the assignments list page.</h1>" );
// } );

// // define a route for the assignment detail page
// app.get( "/assignments/detail", ( req, res ) => {
//     res.send( "<h1>This is the assignment detail page.</h1>" );
// } );

// define a route for the default home page
// app.get( "/", ( req, res ) => {
//     res.sendFile( __dirname + "/views/index.html" );
// } );

// define a route for the assignment list page
app.get( "/user_profile", ( req, res ) => {
    res.sendFile( __dirname + "/views/user_profile.html" );
} );

// // define a route for the assignment detail page
// app.get( "/assignments/detail", ( req, res ) => {
//     res.sendFile( __dirname + "/views/add_ranking.html" );
// } );