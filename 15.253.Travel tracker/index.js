import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db=new pg.Client({
  username:'postgres',
  password:'indiasql123',
  port:'5432',
  database:'world'
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
 const result = await db.query("select country_code from visited_country");
const  countries=[];
result.rows.for_each((country)=>
{
 countries.push(country.country_code);
});
console.log(countries);


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
