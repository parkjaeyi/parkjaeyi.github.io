function BarLoad(){
    const fruitBar=document.getElementById("myCanvas");
        const pencil=fruitBar.getContext("2d");

        let fruit = [
        {name:"Apple", quantity:20, color:"red"},
        {name:"Orange", quantity:10, color:"orange"},
        {name:"Banana", quantity:15,color:"yellow"}
        ];
        
        //bar
        for (let i = 0; i < fruit.length; i++) {
            const fruitBar = fruit[i];
            pencil.fillStyle = fruitBar.color;
            pencil.fillRect(0, 100 * i + 150, fruitBar.quantity * 20, 100);// xpos, ypox, width(scale), height
        //text
            const fruits = fruit[i];
            pencil.font="25px Arial";
            pencil.fillStyle = "black";
            pencil.fillText(fruits.quantity, 50, 100*i +200); //text, xpos, yposBetweenArr + ypos
            pencil.fillText(fruits.name, 50, 98*i +230);
        }
}

function backgroundColor(){
    document.getElementById("myCanvas").style.background = "lightblue"; //background sky
}
document.addEventListener( 'DOMContentLoaded', BarLoad);
document.addEventListener( 'DOMContentLoaded', backgroundColor);
        
        
        
  