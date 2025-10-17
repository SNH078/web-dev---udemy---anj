import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import bcrypt from "bcrypt"; //salting/hashing

import passport from "passport"; // authenticate requests ..add strategy
import { Strategy } from "passport-local"; //username pwd ..credential login 
import session from "express-session"; //session persistence-(by cookie storage)

import env from "dotenv";//env. variable

import GoogleStrategy from "passport-google-oauth2";//OAuth //add google login strategy



const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
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

app.get("/logout", (req, res) => {
  req.logout(function (err) {  // !!logout ..all in lowercase ,,not logOut
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
// OR 

// app.get("/logout",(req,res)=>{
// req.logout((err)=>{
// if(err)console.log(err);
// res.redirect("/");
// });
// });

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/index.html");
  } else {
    res.redirect("/login");
  }
});
//---------------------------------------------------------------------------------------------------
//"auth/google" this redirect(relative) url was passed with base url(localhost3000) while setting up OAuth
//user is redirected here when he choose to sign in using google 
app.get("/auth/google",passport.authenticate("google", {
    scope: ["profile", "email"],// scope :what info(here profile ,email) to get from google acc.?ask permission ..if they consent..triggers google strategy 
  })
);
//after coming from strategy
//giving render paages upon authentication via oauth(google-strategy) using google login strategy
app.get("/auth/google/secrets",passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
//-----------------------------------------------------------------------------------------------------
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
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
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use("local",new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
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


// Google strategy -------------------------------------------------------------------------
// name of strategy : "google"
passport.use("google",new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    } ,
    //upon successful login using googl acc...use callback
    //accessToken, refreshToken are passed to keep track of user sign in session 
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email,]);
        if (result.rows.length === 0) 
          {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]   //pwd as  google ..can user other string also..cat dog  car
          );
          //new 
          return cb(null, newUser.rows[0]);// error status , user row
        } 
        else
         {
          //existing
          return cb(null, result.rows[0]);
        }
      } 
      catch (err) {
        return cb(err);
      }
    }
  )
);
//-------------------------------------------------------------------------------------------------


passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
