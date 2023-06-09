const DEBUG = true;

//set up the server
const express = require( "express" );
const logger = require("morgan");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
// const helmet = require("helmet");
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db/db_connection');
const app = express();
const port = 3600;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL 
  };
app.use(auth(config));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;
    next();
})

// req.isAuthenticated is provided from the auth router
app.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  // const { requiresAuth } = require('express-openid-connect');
  
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  
  app.get('/', (req, res) => {
      res.render('index')
  });


// define a route for the assignment list page
const read_newrank_all_sql = `
    SELECT
        show_id, name, genreName, description, ranking
    FROM shows
    JOIN genres
        ON shows.genre_id = genres.genre_id
    WHERE user_id = ?
`
app.get( "/add_ranking", requiresAuth(), ( req, res ) => {
    db.execute(read_newrank_all_sql, [req.oidc.user.sub], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.render("add_ranking", {shows: results})
    });
});

// define a route for the assignment detail page
const read_all_rankings_sql = `
    SELECT
        name, genreName, ranking, description
    FROM shows
    JOIN genres
        ON shows.genre_id = genres.genre_id
    WHERE user_id = ?
    ORDER BY show_id DESC
`
app.get( "/add_ranking/all_rankings", requiresAuth(), ( req, res ) => {
    db.execute(read_all_rankings_sql, [req.oidc.user.sub], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.render("all_rankings", {shows: results})
    });
});


// define a route for item CREATE
const create_show_sql = `
    INSERT INTO shows
        (name, genre_id, description, ranking, user_id)
    VALUES
        (?, ?, ?, ?, ?)
`
app.post("/all_rankings", requiresAuth(), ( req, res ) => {
    db.execute(create_show_sql, [req.body.show_name, req.body.genre_label, req.body.description_info, req.body.ranking_num, req.oidc.user.sub], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/add_ranking/all_rankings`);
        }
    });
})


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );