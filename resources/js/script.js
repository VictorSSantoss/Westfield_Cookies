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
document.addEventListener("DOMContentLoaded", () => {
  const catalogItems = document.querySelectorAll(".catalog-item");

  catalogItems.forEach(item => {
    const cookie = item.querySelector(".cookie-img-swap"); // the image inside

    if (!cookie) return; // skip if no cookie image

    const originalSrc = cookie.getAttribute("src");
    const hoverSrc = cookie.getAttribute("data-hover");

    // Hover on the whole catalog-item
    item.addEventListener("mouseenter", () => {
      cookie.setAttribute("src", hoverSrc);
    });

    item.addEventListener("mouseleave", () => {
      cookie.setAttribute("src", originalSrc);
    });
  });
});



