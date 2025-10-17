//no insertion possible here ...fixed countries dispalyed here(that were initially added to table) ...not dynamic 


//create these tables in pgadmin nd import countries.csv in country table


//------------------------------PG -------------------------------
// create table countries
// (
// id  serial primary key,
// country_code char(2),
// country_name varchar(100)
// );

// create table visited_countries
// (
//   id  serial primary key,
//   country_code char(2) not null unique
//   );


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
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  //can also run this query nd pushing in array outside this get request..as done in flag project (15.252)
  
  //result.rows is array of objects(having property country_code),where each object represent a row of db
  // nd so we can't equate countries array with an array of object 
  //although the result.row is also an array (but object ka array)
  //need to extract country_code from object...
  //here while looping (for each)...country is object nd object.property 
  //gives the value of that row for for that object 

  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


//can also write the db  query outside get   ----------------------


// // Store the result in a variable to avoid querying the database repeatedly
// let countries = [];
// db.query("SELECT country_code FROM visited_countries", (err, result) => {
//   if (err) {
//     console.error("Error executing query", err.stack);
//     // Handle the error if needed
//   } else {
//     const countries = result.rows.map(row => row.country_code);

//     // Extract the country_code property from each row using map
//.map(row => row.country_code) iterates over each object in result.rows,
// extracts the country_code property from each object, and creates a new array 
//containing only the country_code values. IN ONE GO  only.

    
//     console.log(countries); // Log the extracted country codes
//   }
//   db.end(); // Close the database connection after querying
// });


// GET home page
// app.get("/", (req, res) => {
//   console.log(countries);
//   res.render("index.ejs", { countries: countries, total: countries.length });
// });
