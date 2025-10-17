//can add country from server by user 

//type any country name ...it will get coloredd
//here input format fucntion is added by me 
// + alert is also added by me 

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "indiasql123",
  port: 5432
});
// db.connect(); //or if u want to check connection status..so write this with connect
db.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// Function to format country name
function formatCountryName(anss) {
  return anss.charAt(0).toUpperCase() + anss.slice(1).toLowerCase();
}
//see index4 for a method wothout creating a separate function 

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];//get hold of whever is typed in input that has name = country
const ss = formatCountryName(input);
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [ss] // placeholders($) help in inserting values in sql in a dynamic way
  );

  if (result.rows.length !== 0) {
    const data = result.rows[0];//here,res.rows is array with single item
   const countryCode=  data.country_code;//data is object
  
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode]);
    res.redirect("/");
  }
  else 
  {
    
  res.send(`<script>alert("Your Input : ${ss} \\n No such country exists.
    CHECK FOR ANY TYPOS IN INPUT");window.location.href = "/"; </script>`);
    
  // res.send('<script>alert("Your Input : ${ss} \\n No such country exists.\\nCHECK ANY TYPOS IN INPUT");window.location.href = "/"; </script>'); 
  
      //The reason the variable is not printed in the alert is that the variable needs to be interpolated correctly in the JavaScript string. When using 
      //template literals in JavaScript, you should use backticks (`) instead of single quotes (').
  
      //also temp literal allow span over multiple line w/o using escape \\n   
  
      // res.redirect("/"); won't work
    // window.location.href = "/";   is used 
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
