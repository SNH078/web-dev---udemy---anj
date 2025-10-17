// change "main"="index1.1.js" in package.json
//i.e. file name 

//use body parser to tap into what is entered in input 
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
//the above 3 line of code help to dynammically change the file path(address) in line 12
//if we r running this locally then only  /public/index.html is passed 
//if running on cloud then windows/drive/folder/public/index.html full address 
// relative to the computer is passed 
const app = express();
const port = 3000;

//this method is used bfr any route handler
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});

//logs the req.body i.e. the entered values of input on console 
app.post("/submit", (req, res) => {
  console.log(req.body);
});

//this tym we ain't passing html tags in res.send but the entire 
//html file hence we are using res.sendFile 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



