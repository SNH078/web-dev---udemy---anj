//udemy@gmail.com
// pwd : udemy
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import bcrypt from "bcrypt";
//------------------------------------------------------------
import session from "express-session";//express-session allows saving of cookie on user browser(allow user login session)//session management
//passport is middleware
import passport from "passport";//allows addition of authentication strategies..authenticate requests
import { Strategy } from "passport-local";//authenticate user using username nd pwd(means local login)

const app = express();
const port = 3000;
const saltRounds = 10;

//-----------------------------------------------------------------
app.use(
  session({
    secret: "TOPSECRETWORD",    //secret is used to sign the session ID cookie.
    resave: false,     //controls whether all sessions (modified or not) should be saved back to the store.() 
    saveUninitialized: true,//determines whether sessions without any data (uninitialized) should be saved.
    cookie:{
      maxAge:1000*60*60*24, //max age is in milisecond //1000mili*60 sec*60min*24 hr=mili seconds in 1 day
    },
  })
);
//-----------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize()); //wrtitten only aftr session definition
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "indiasql123",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
//-----------------------------------------------------------------
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//in case u r trying to access secrets page by copy paste url http://localhost:3000/secrets
app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) { //is the current user already authenticated ?...active session?..ask deserialize 
    // isAuthenticated() : a passport method
  console.log("already auth or login or register");
    res.render("secrets.ejs");
  } else {
    console.log("not auth")
    res.redirect("/login");
  }
});

//here we r using alternate method.. passport.authenticate()  instead of async res,req...a
//passport.authenticate() method trigger the local-strategy()(local:passport-local) to authenticate this request
//on subbmitting details on login page..making a post on login page
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secrets",  // successfully authenticated
    failureRedirect: "/login",    //fail
  })
 
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } 
    else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );// result stores recently inserted row
          const user = result.rows[0];
        
          //req.login() method is provided by passport 
          // automatically authenticates user ..pass info to session..serialize..deserialize and when we reach /secret page ..we r already authenticated ...
          req.login(user, (err) => {
            console.log("success -new registration ");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  } 
});


// verify is a function
//cb is always written as callback in passport-local
/*local strategy tries to validate whether if the current user already has the right
pwd nd email/username is stored in DB already using verify function*/
//passport automatically grab hold of username nd pwd from form..thus no need to use body parser to get hold of it...
//passport is trigerred as soon as we try to authenticate user
// inside strategy { we hv copied the login code }(and made some modification in names as we r not using body parser)e.g email->username
passport.use(
  new Strategy(async function verify(username, password, cb) { // cb : callback
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);//instead of console logging error
          } else {
            if (valid) {
              //Passed password check //correct pwd // no error:null
              return cb(null, user); //cb( error,active user) ,instead of res.render("/secrets.ejs");
            } else {
              //Did not pass password check  // incorrect pwd
              return cb(null, false); // this false is passed to isAuthenticated 
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);
// write it just above app.listen
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
/* Serialization is the process of converting an object (in this case, a user object) into a format that
 can be stored persistently or transferred over the network. In web applications, this typically involves
 storing the user's unique identifier in the session (like a user ID).*/

/*Deserialization is the process of converting the serialized user back into an object that can be used
 by your application...to check if the user is authenticated already*/ 

/*once user is authenticated...Passport typically verifies user credentials and its user info is stored...using serialize()*/
/*When the same user makes subsequent requests to your server, Passport checks if there is an active
 session associated with the request (typically identified by a session cookie).
If a session exists (req.session), Passport retrieves the serialized user ID from the session using deserialize()*/
 



