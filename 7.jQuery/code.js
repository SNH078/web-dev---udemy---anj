// prints the src of img on console(ctrl+sft+I)
console.log($("img").attr("src"));
// set link to bing.com
$("a").attr("href","https://bing.com/");

//add class to h4
$("h4").addClass("big-title");
$("h5").addClass("big-title margin-50");

//change h2 text to good bye
$("h2").text(" good bye");

//behaviour of text and innerHTML with <em> tag
$("h1").html("<em>evening html </em>");
// $("h1").html("<strong>evening</strong>");

 $("h3").text("<em>morning  text </em>");
//  $("h3").text("<strong>morning</strong>");

/*-------------------------TEST-----------------------------*/
//1 -----using JQuery click in h4 to change h4 color
$("h4").click(function(){
$("h4").css("color","purple");
});

//1-------   using DOM 
// document.getElementsByTagName("h4")[0].addEventListener("click",function(){
//             document.querySelector("h4").style.color="blue";
//         });
//need to use [0] bcz getElementsByTagName   returns a collection of elements, 
//not a single element. You cannot directly add an event listener to a collection.


/*-----------------------------TEST ------------------------*/
//2------   DOM click on button to change h5 color 
for(var i=0;i<4;i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){
        document.querySelector("h5").style.color="blue";
    });
}

//2-----DOM using single button ..
// document.querySelectorAll("button")[1].addEventListener("click",function(){
//     document.querySelector("h5").style.color="blue";
// });

// 2----JQuery applies to all button without using for loop
// $("button").click(function(){
// $("h5").css("color","green");
// });

/*-------------------------TEST-----------------------------*/
//1...detect keystrokes
$("input").keypress(function(event){
    console.log(event.key);
});

//$("input") selects all <input> elements on the page using jQuery.
// event is the event object that gets passed to the handler
//contains information about the event, such as which key was pressed
// event.key property returns the value of the key that was pressed
//when a user presses a key while focused on an input field,
// the specific key value is logged to the console.



// //2...try this aftr commenting out above code for detecting strokes
// //type in box 
// $("input").keypress(function(event){
//     $("h4").text(event.key);
// });

// //3....jst press keys ..no matter where
// $(document).keypress(function(event){
//     $("h4").text(event.key);
// });

/*-------------------------TEST-----------------------------*/
//mouse over event to change h5 color...w/o on()
// $("h5").mouseover(function(){
// $("h5").css("color","red");
// });

//on() method to attach on or more event handlers -- event to change h5 color 
$("h5").on("mouseover",function(){
    $("h5").css("color","red");
    });

/*-------------------------TEST-----------------------------*/
//1.add button jst before selected element
// $("h4").before("<button>car</button>");

// 2. add button jst after selected element
// $("h4").after("<button>car</button>");

// 3.add button jst before the opening tag of selected element
// $("h4").prepend("<button>car</button>");

// 4.add button jst after the closing tag of selected element
// $("h4").append("<button>car</button>");

//removes all button 
// $("button").remove();
// // $("button").show();
/*-------------------------TEST-----------------------------*/
//1.click in button to hide h1 content
// $("button").click(function () {
//     $("h1").hide();  
//   });

//2.show
//$("h1").show();

/*-------------------------TEST-----------------------------*/
//1.fade in on button click
// $("button").click(function () {
//     $("h2").fadeOut();  
//   });

// //2.fade in on button click
// $("button").click(function () {
//     $("h1").fadeIn();  
//   });

//3. fade toggle on button click
// $("button").click(function () {
//     $("h1").fadeToggle();  
// });


/*-------------------------TEST-----------------------------*/
//1.slide up h1
// $("button").click(function () {
//     $("h1").slideUp();  
//   });
/*-------------------------TEST-----------------------------*/
//2.slide down h1
//   $("button").click(function () {
//     $("h1").slideDown();  
//   });



/*-------------------------TEST-----------------------------*/
// 1.opacity change of h1
// $("h1").animate({opacity:0.5});

//2. multiple animation
// $("button").click(function () {
//     $("h1").slideUp().slideDown().animate({opacity:0.5});  
//  });
