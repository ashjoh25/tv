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
app.get( "/add_ranking", requiresAuth(), ( req, res ) => {
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
app.get( "/add_ranking/all_rankings", requiresAuth(), ( req, res ) => {
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
// const DEBUG = true;

// //set up the server
// const express = require( "express" );
// const logger = require("morgan");
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');
// const dotenv = require('dotenv');
// dotenv.config();
// const db = require('./db/db_connection');
// const app = express();
// const port = 3000;

// // Configure Express to use EJS
// app.set( "views",  __dirname + "/views");
// app.set( "view engine", "ejs" );

// // Configure Express to parse URL-encoded POST request bodies (traditional forms)
// app.use( express.urlencoded({ extended: false }) );

// // define middleware that logs all incoming requests
// app.use(logger("dev"));

// // define middleware that serves static resources in the public directory
// app.use(express.static(__dirname + '/public'));

// //Configure auth 
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

// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });


// // define a route for the default home page
// app.get( "/", ( req, res ) => {
//     res.render('index');
// } );

// // define a route for the assignment list page
// const read_assignments_all_sql = `
//     SELECT 
//         assignmentId, title, priority, subjectName, 
//         assignments.subjectId as subjectId,
//         DATE_FORMAT(dueDate, "%m/%d/%Y (%W)") AS dueDateFormatted
//     FROM assignments
//     JOIN subjects
//         ON assignments.subjectId = subjects.subjectId
//     WHERE assignments.userId = ?
//     ORDER BY assignments.assignmentId DESC
// `

// app.get( "/assignments",  requiresAuth(), ( req, res ) => {
//     db.execute(read_assignments_all_sql, [req.oidc.user.sub], (error, results) => {
//         if (DEBUG)
//             console.log(error ? error : results);
//         if (error)
//             res.status(500).send(error); //Internal Server Error
//         else {
//             let data = { hwlist : results };
//             res.render('assignments', data);
//             // What's passed to the rendered view: 
//             //  hwlist: [
//             //     { assignmentId: __ , title: __ , priority: __ , subjectName: __ , subjectId: __ ,  dueDateFormatted: __ },
//             //     { assignmentId: __ , title: __ , priority: __ , subjectName: __ , subjectId: __ ,   dueDateFormatted: __ },
//             //     ...
//             //  ]
            
//         }
//     });
// });

// // define a route for the assignment detail page
// const read_assignment_detail_sql = `
//     SELECT
//         assignmentId, title, priority, subjectName,
//         assignments.subjectId as subjectId,
//         DATE_FORMAT(dueDate, "%W, %M %D %Y") AS dueDateExtended, 
//         DATE_FORMAT(dueDate, "%Y-%m-%d") AS dueDateYMD, 
//         description
//     FROM assignments
//     JOIN subjects
//         ON assignments.subjectId = subjects.subjectId
//     WHERE assignmentId = ?
//     AND assignments.userId = ?
// `
// app.get( "/assignments/:id",  requiresAuth(),  ( req, res ) => {
//     db.execute(read_assignment_detail_sql, [req.params.id, req.oidc.user.sub], (error, results) => {
//         if (DEBUG)
//             console.log(error ? error : results);
//         if (error)
//             res.status(500).send(error); //Internal Server Error
//         else if (results.length == 0)
//             res.status(404).send(`No assignment found with id = "${req.params.id}"` ); // NOT FOUND
//         else {

//             let data = {hw: results[0]}; // results is still an array, get first (only) element
//             res.render('detail', data); 
//             // What's passed to the rendered view: 
//             //  hw: {assignmentId: ___ , title: ___ , priority: ___ , 
//             //    subjectName: ___ , subjectId: ___, 
//             //    dueDateExtended: ___ , dueDateYMD: ___ , description: ___ 
//             //  }
//         }
//     });
// });

// // define a route for assignment DELETE
// const delete_assignment_sql = `
//     DELETE 
//     FROM
//         assignments
//     WHERE
//         assignmentId = ?
//     AND userId = ?
// `
// app.get("/assignments/:id/delete",  requiresAuth(), ( req, res ) => {
//     db.execute(delete_assignment_sql, [req.params.id, req.oidc.user.sub], (error, results) => {
//         if (DEBUG)
//             console.log(error ? error : results);
//         if (error)
//             res.status(500).send(error); //Internal Server Error
//         else {
//             res.redirect("/assignments");
//         }
//     });
// });

// // define a route for assignment CREATE
// const create_assignment_sql = `
//     INSERT INTO assignments 
//         (title, priority, subjectId, dueDate, userId) 
//     VALUES 
//         (?, ?, ?, ?, ?);
// `
// app.post("/assignments", requiresAuth(),  ( req, res ) => {
//     db.execute(create_assignment_sql, [req.body.title, req.body.priority, req.body.subject, req.body.dueDate, req.oidc.user.sub], (error, results) => {
//         if (DEBUG)
//             console.log(error ? error : results);
//         if (error)
//             res.status(500).send(error); //Internal Server Error
//         else {
//             //results.insertId has the primary key (assignmentId) of the newly inserted row.
//             res.redirect(`/assignments/${results.insertId}`);
//         }
//     });
// });

// // define a route for assignment UPDATE
// const update_assignment_sql = `
//     UPDATE
//         assignments
//     SET
//         title = ?,
//         priority = ?,
//         subjectId = ?,
//         dueDate = ?,
//         description = ?
//     WHERE
//         assignmentId = ?
//     AND userId = ?
// `
// app.post("/assignments/:id",  requiresAuth(), ( req, res ) => {
//     db.execute(update_assignment_sql, [req.body.title, req.body.priority, req.body.subject, req.body.dueDate, req.body.description, req.params.id, req.oidc.user.sub], (error, results) => {
//         if (DEBUG)
//             console.log(error ? error : results);
//         if (error)
//             res.status(500).send(error); //Internal Server Error
//         else {
//             res.redirect(`/assignments/${req.params.id}`);
//         }
//     });
// });

// // start the server
// app.listen( port, () => {
//     console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
// } );