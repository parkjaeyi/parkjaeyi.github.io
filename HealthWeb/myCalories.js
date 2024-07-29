//these values will update the progress bar based on the input calories
//first need to get the data from the previous page which was a form that sent over some data
var urlParams=new URLSearchParams(window.location.search);
var gender = urlParams.get("gender");
var feet = urlParams.get("feet");
var inches = urlParams.get("inches");
var age = urlParams.get("age");
var weight = urlParams.get("weight");
weight=weight*0.453592 //pound to kgs
var calories=parseInt(urlParams.get("calories"));
var goal=0;

//this will get updated as the user inputs food and will be divided by the goal to show a percent
var current=0;

//using the Mifflin-St Jeor equations to get bmr
//computed daily calories based off user input
if (gender === "male") {
    // BMR for men: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (years) + 5
    goal = (10 * weight + 6.25 * (feet * 30.48 + inches * 2.54) - 5 * age + 5);
} else if (gender === "female") {
    // BMR for women: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (years) - 161
    goal = (10 * weight + 6.25 * (feet * 30.48 + inches * 2.54) - 5 * age - 161);
}else if(calories){
    goal=calories
}

document.querySelector('.progress-bar h3').textContent+=parseInt(goal);

//main function that adds food and increments calories so that the progress bar can be recalculated

function addFood(mealClassCal) {
    // First, check if the calories input field is not empty
    let calInput = document.querySelector(`.${mealClassCal}`);
    if (calInput.value.trim() === '') {
        calInput.value=0;
        console.log(calInput.value);
        return;
    }

    //update current variable with food input if calories are greater than 0
    // Call the validateCalories function
   if(!validateCalories(mealClassCal)){
    return;
   }

    current+=parseInt(calInput.value);

   //At this point either the calories were correctly stated, or 
   //some food was placed in without any calories or 0 because the user did not know or it was actually 0
   // Get the food name input
   let foodNameInput = calInput.parentElement.querySelector('.food-name');
   let foodName = foodNameInput.value.trim();

   // Create a new list item
   let listItem = document.createElement('li');
   
   if (foodName===""){
    listItem.innerHTML= "kcal: "+`${calInput.value}`;
   } else{
    listItem.innerHTML= "Food Name: "+`${foodName}`+ ", kcal : "+`${calInput.value}`;
   }

    // Add a close button to delete the Food
    //from tasklist Assignment
    var closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = "\u00d7";

    //if this is pressed the calories from this should be decremented from the update bar
    closeButton.onclick= function(){
        deleteFood(this);
    };
        listItem.appendChild(closeButton);

   // Get the appropriate list container and append the list item
   let listContainer = calInput.closest('.list-container').querySelector('ul');
   listContainer.appendChild(listItem);

   // Clear the input fields
   foodNameInput.value = '';
   calInput.value = '';

   updateBar();
}

function updateBar(){
    //update the bar with the given cal input
    let percentage=Math.round((current/goal)*100);
    let bar=document.querySelector(".progress__fill");
    let bartext=document.querySelector(".progress__text");

    //change fill color based on percentage
    if (percentage>=0){
    bar.style.background="yellow";
    }
    if (percentage>=60){
    bar.style.background="rgb(195, 255, 0)";
    }
    if (percentage>70){
    bar.style.background="rgb(128, 255, 0)";
    }
    if (percentage===100){
    bar.style.background="rgb(0,255,0)";
    }

    if (percentage>100){
        bar.style.background="red";
    }

    bar.style.width=`${percentage}%`;


    console.log(current);
    console.log(percentage);


    bar.style.width=`${percentage}%`;
    bartext.textContent=`${current}`;

}

function validateCalories(mealClassCal) {
    let calInput = document.querySelector(`.${mealClassCal}`);
    let value = parseInt(calInput.value);

    if (isNaN(value) || value < 0) {
        return false;
    } else {
        return true;
    }
}

// deletes a food when the close button is clicked
function deleteFood(closeButton) {
    var food = closeButton.parentElement;
    food.style.display = 'none'; // Hide the food

    //gets the calories from the list item. The first substring with a number in it
    var deletedCalories=parseFloat(food.textContent.match(/\d+/)[0]);

    if (current-deletedCalories<0){
        current=0;
    }
    else{
        current-=deletedCalories;
    }

    updateBar();
}



//got this from gpt. made some changesto fit the website needs
if (Notification.permission === 'default') {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // You can now show notifications
        } else {
            console.warn('Notification permission denied.');
        }
    });
}


function showNotification() {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
        return;
    }

    // Check if the user has granted permission to show notifications
    if (Notification.permission === "granted") {
        // Create a notification
        var notification = new Notification("Reminder", {
            body: "You have "+goal-current+" calories left to log. COME ON YOU GOT THIS!",
        });
    } else if (Notification.permission !== "denied") {
        // Ask the user for permission to show notifications
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}

// Set an interval to show the notification every 2 hours
setInterval(showNotification, 120 * 60 * 1000);
