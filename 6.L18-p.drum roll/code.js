//detecting button press
var numberOfButtons =document.querySelectorAll(".drum").length;
for(var i =0;i<numberOfButtons;i++)
{
    document.querySelectorAll("button")[i].addEventListener("click",handleClick);
    function handleClick()
    {
//to change color of button to white when pressed
// this.style.color="white";
var buttonInnerHTML=this.innerHTML;
//captures the innerHTML of pressed button 
makeSound(buttonInnerHTML);
buttonAnimation(buttonInnerHTML);
    };
}

/* or using anonymous function 
document.querySelectorAll("button")[i].addEventListener("click",function(){alert("I got clicked !");});
*/


//detecting key press from keyboard
//event.key represent the key value of event:keypress 
//event is triggered when key is pressed
 document.addEventListener("keypress",function(event)
 {
   makeSound(event.key);
   buttonAnimation(event.key);
 });



 function makeSound(key){
    switch(key)
{
    case"w":
    var ad=new Audio('sounds/tom-1.mp3');
     ad.play();
     break;

     case"a":
     var ad=new Audio('sounds/tom-2.mp3');
      ad.play();
      break;
      case"s":
      var ad=new Audio('sounds/tom-3.mp3');
       ad.play();
       break;
       case"d":
       var ad=new Audio('sounds/tom-4.mp3');
        ad.play();
        break;
        case"j":
        var ad=new Audio('sounds/snare.mp3');
         ad.play();
         break;
         case"k":
         var ad=new Audio('sounds/kick-bass.mp3');
          ad.play();
          break;
          case"l":
          var ad=new Audio('sounds/crash.mp3');
           ad.play();
           break;
           default:
           console.log(buttonInnenrHTML);
}
 }
function buttonAnimation(currentKey){
var activeButton=document.querySelector("."+currentKey);// select class .w
activeButton.classList.add("pressed");
//add delay
setTimeout(function(){activeButton.classList.remove("pressed");}
,100);
}
 