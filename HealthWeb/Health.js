const HomeButton=document.getElementById("Home");
const TrackerButton=document.getElementById("Tracker");
const ExerciseButton=document.getElementById("Exercise");
const AboutButton=document.getElementById("AboutUs");
// let HealthPages=[document.getElementById("Homepage"), document.getElementById("Secondpage")];
// let pages=0;
HomeButton.addEventListener("click",()=>{
    location.href='Health.html';
});
TrackerButton.addEventListener("click",()=>{
    location.href='HealthP2.html';
 });
ExerciseButton.addEventListener("click",()=>{
    location.href='HealthP3.html';
 });
AboutButton.addEventListener("click",()=>{
    location.href='HealthP4.html';
 });