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

// Catalog background cookies
/*
document.addEventListener("DOMContentLoaded", () => {
  const cookies = document.querySelectorAll(".cookie-catalog");
  const nav = document.querySelector(".catalog-all-items");

  const navHeight = nav.offsetHeight;
  const navWidth = nav.offsetWidth;

  cookies.forEach(cookie => {
    const randomTop = Math.random() * (navHeight - 40); // 40 = cookie size
    const randomLeft = Math.random() * (navWidth - 40);

    cookie.style.top = `${randomTop}px`;
    cookie.style.left = `${randomLeft}px`;
  });
});
