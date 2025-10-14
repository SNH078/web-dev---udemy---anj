// for 1st image
var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

var randomImageSource = "images/" + "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

document.querySelectorAll("img")[0].setAttribute("src", randomImageSource);
// $("img").first().attr("src", randomImageSource);
// or 
// $("img").eq(0).attr("src", randomImageSource);
/* if you want to use the array-like indexing with jQuery, you need to use native DOM methods to set
 the attribute since the indexed access returns a DOM element, not a jQuery object.*/
//$("img")[0].setAttribute("src", randomImageSource);
//pure J query.
//$($("img")[0]).attr("src", randomImageSource);

// in j Query
  
// for 2nd image
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImageSource2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);


//If player 1 wins
if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
}
else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").textContent = "Player 2 Wins! 🚩";
}
else {
  document.querySelector("h1").innerHTML = "Draw!";
}

