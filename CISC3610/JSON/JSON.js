function BarLoad(){
        const fruitBar=document.getElementById("myCanvas");
        const pencil=fruitBar.getContext("2d");

        let fruit = [
        {name:"Apple", quantity:20, color:"red"},
        {name:"Orange", quantity:10, color:"orange"},
        {name:"Banana", quantity:15,color:"yellow"},
        {name:"Kiwi", quantity: 5, color:"green"},
        {name:"Blueberry", quantity: 5, color: "blueviolet" },
        {name:"Grapes", quantity: 10, color: "purple"}
        ];
        
        //bar
        for (let i = 0; i < fruit.length; i++) {
            const fruitBar = fruit[i];
            pencil.fillStyle = fruitBar.color;
            pencil.fillRect(0, 110 * i + 80, fruitBar.quantity * 20, 100);// xpos, ypox, width(scale), height
           
            
            //text
            pencil.font="25px Arial";
            pencil.fillStyle = "black";
            pencil.fillText(fruitBar.quantity + " "+fruitBar.name, fruitBar.quantity+20, 115*i +130); //text, xpos, yposBetweenArr + ypos
           
            

            
        }   
        
       
        
}

function text()
{

}

function backgroundColor(){
    document.getElementById("myCanvas").style.background = "lightblue"; //background sky
}
document.addEventListener( 'DOMContentLoaded', BarLoad);
document.addEventListener( 'DOMContentLoaded', backgroundColor);
        
        
        
  