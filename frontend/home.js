// Page load hone par message (learning ke liye)
document.addEventListener("DOMContentLoaded", () => {
    console.log("Home page loaded successfully");
});


// Hero section button
const heroBtn = document.querySelector(".hero-btn");

heroBtn.addEventListener("click", () => {
    alert("Welcome to Note Sharing Platform!");
});


// Join section button
const joinBtn = document.querySelector(".join-btn");

joinBtn.addEventListener("click", () => {
    alert("Thank you for your interest! We will update you soon.");
});


// Navbar active link logic (simple)
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});