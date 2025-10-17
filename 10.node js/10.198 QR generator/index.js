//install packages 2 
// require to import(module change )

//inquirer nd qr-image 
import inquirer from 'inquirer';

import qr from 'qr-image';

import fs from 'fs';

inquirer
  .prompt([
    // curly braces are required as it is a js object
  {  
message:"type in your url",
name:"URL"
}
  ])
  .then((answers) => {
    // console.log(answers);
 const urll=answers.URL;
//qr image 
 var qr_png = qr.image(urll);
qr_png.pipe(fs.createWriteStream('qrImage.png'));
 
// write file
fs.writeFile('urrl.txt', urll, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  });



  

 
