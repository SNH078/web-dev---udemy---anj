// change "main"="index1.js" in package.json
//i.e. file name 
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
//the above 3 line of code help to dynammically change the file path(address) in line 12
//if we r running this locally then only  /public/index.html is passed 
//if running on cloud then windows/drive/folder/public/index.html full address 
// relative to the computer is passed 
const app = express();
const port = 3000;

//When a GET request is made to this URL("/"), the callback function is executed.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
//this tym we ain't passing html tags in res.send but the entire 
//html file hence we are using res.sendFile 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



