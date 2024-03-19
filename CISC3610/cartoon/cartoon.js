"use strict";

function changeCanvasColor() {
    var canvas = document.getElementById("Canvas2");
    var canvas3 = document.getElementById("Canvas3");
    var context = canvas.getContext("2d");
   // var mountain= document.getElementById("mountainCanvas");
   // var mountainColor= mountain.getContext("2d");
    


   // housebaseColor.fillStyle="#7B3F00";
   // housebaseColor.fillRect(680, 100, 140, 100);

   //ground color
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height)
}
function changeBackgroundColor () {

    document.getElementById("Canvas").style.background = "lightblue"; //background sky
}

document.addEventListener( 'DOMContentLoaded', changeCanvasColor);
document.addEventListener( 'DOMContentLoaded', changeBackgroundColor);
