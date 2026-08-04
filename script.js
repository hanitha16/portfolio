// Typing Animation
const textArray = [
    "Frontend Developer",
    "CSE Student",
    "Problem Solver",
    "UI/UX Enthusiast"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
    currentText = textArray[index];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % textArray.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();


// Smooth scroll enhancement (optional improvement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});


// Navbar shadow on scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".custom-navbar");

    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    } else {
        navbar.style.boxShadow = "none";
    }
});


// Button click effect (small UX touch)
document.querySelectorAll("button, .btn").forEach(btn => {
    btn.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";

        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
    });
});


