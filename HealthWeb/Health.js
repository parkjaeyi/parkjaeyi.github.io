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
