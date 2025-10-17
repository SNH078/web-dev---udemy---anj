// index.js is in 2.about me

//create server file
import express from "express";
const app = express();
const port = 3000;

// create message route 
app.get("/", (req ,res)=>{

    res.send("<h1>HOME PAGE</h1>");
});
// replace space in url with forward slash /
app.get("/about/me", (req ,res)=>{
    res.send("<h1><b>ABOUT ME</b></h1><p>my name is ANJELA</p>");
});
app.get("/contact", (req ,res)=>{

    res.send("<h1>CONTACT</h1><p>phone no : +22-454857</p>");
});
// set up a port to run our server 
//app.listen () is a express method 
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
