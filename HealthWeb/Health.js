"use strict";

//Menu toggle

var navLinks=document.getElementById("nav-links");

function showMenu(){
    navLinks.style.display="block";
    navLinks.style.right="0";
}

function hideMenu(){
    navLinks.style.display="none";
}
document.getElementById("signIn").addEventListener("click",()=>{
    document.querySelector(".popup").style.display="flex";
})
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".popup").style.display="none";
})

document.addEventListener('DOMContentLoaded', () => {
    const areas = document.querySelectorAll('map area');

    areas.forEach(area => {
        area.addEventListener('click', () => {
            const sectionId = area.getAttribute('href').substring(1); 
            highlightSection(sectionId);
        });
    });

    function highlightSection(sectionId) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.remove('highlighted');
        });

        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('highlighted');
        }
    }
    //these values will update the progress bar based on the input calories
//first need to get the data from the previous page which was a form that sent over some data
var urlParams=new URLSearchParams(window.location.search);
var weight=parseFloat(urlParams.get("weight"));
var calories=parseInt(urlParams.get("calories"));
var goal=0;

//this will get updated as the user inputs food and will be divided by the goal to show a percent
var current=0;

//computed daily calories based off user input
if (weight){
    weight=(weight*15)-300;
    goal=weight;
    document.querySelector('.progress-bar h3').textContent+=goal;
}else if(calories){
    goal=calories
    document.querySelector('.progress-bar h3').textContent+=goal;
}



//main function that adds food and increments calories so that the progress bar can be recalculated

function addFood(mealClassName) {
    // First, check if the calories input field is not empty
    let calInput = document.querySelector(`.${mealClassName}`);
    if (calInput.value.trim() === '') {
        calInput.value=0;
        console.log(calInput.value);
        return;
    }

    //update current variable with food input
    current+=parseInt(calInput.value);

    // Call the validateCalories function
   if(!validateCalories(mealClassName)){
    return;
   }

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

function validateCalories(mealClassName) {
    let calInput = document.querySelector(`.${mealClassName}`);

    if (calInput.validity.patternMismatch) {
        return false;
    } else {
        calInput.setCustomValidity("");
        console.log("good");
        return true;
    }
}

// deletes a food when the close button is clicked
function deleteFood(closeButton) {
    var food = closeButton.parentElement;
    food.style.display = 'none'; // Hide the food

    //gets the calories from the list item. The first substring with a number in it
    var deletedCalories=parseFloat(food.textContent.match(/\d+/)[0]);
    current-=deletedCalories;
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

});
