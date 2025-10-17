// index.js is in 1.express\ server

//create serer file
import express from "express";
const app = express();
const port = 3000;

// create message route 
app.get("/", (req ,res)=>{
    //only one response at a time 
    
    // res.send("hello");
    // res.send(req.rawHeaders);
    res.send("<h1>helllooo</h1>");
});

// set up a port to run our server 
//app.listen () is a express method 
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

