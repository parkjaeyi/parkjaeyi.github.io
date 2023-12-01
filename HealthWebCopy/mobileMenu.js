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

//SignInMenu
document.getElementById("signIn").addEventListener("click",()=>{
    document.querySelector(".popup").style.display="flex";
})
document.querySelector(".popup-close").addEventListener("click",()=>{
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
});