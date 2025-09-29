// Array of words to display one by one
const words = ["Chewy", "Crunchy", "Delicious"];
let currentWord = 0;
let currentLetter = 0;

const typingSpeed = 150; // Speed of typing in milliseconds
const pauseBetweenWords = 1000; // Pause between words in milliseconds

function showText() {
    const output = document.getElementById("output");
    const word = words[currentWord];

    // Adding one letter at a time
    if (currentLetter < word.length) {
        output.textContent += word[currentLetter];
        currentLetter++;
        setTimeout(showText, typingSpeed); // Adjust typing speed here
    } else {
    // Move to next word
    setTimeout(() => {
        output.textContent = "";
        currentLetter = 0;
        currentWord++;
    // Loop back to first word
        if (currentWord >= words.length) {
            currentWord = 0;
        }

        showText();
    }, pauseBetweenWords);
  }
}

document.addEventListener("DOMContentLoaded", showText);

// SVG Image Anaimation
document.addEventListener("DOMContentLoaded", () => {
  const svgCircle = document.querySelector(".svg-circle");

  function showOnScroll() {
    if (window.scrollY > 0) { 
      svgCircle.classList.add("visible");
      window.removeEventListener("scroll", showOnScroll);
    }
  }

  window.addEventListener("scroll", showOnScroll);
});

// Cookie on hover swap
const cookies = document.querySelectorAll(".cookie-img-swap");

cookies.forEach(cookie => {
  cookie.addEventListener("mouseenter", () => {
    cookie.dataset.original = cookie.src;
    cookie.src = cookie.dataset.hover;
  });
  cookie.addEventListener("mouseleave", () => {
    cookie.src = cookie.dataset.original;
  });
});
