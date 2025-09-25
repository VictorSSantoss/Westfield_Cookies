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

    // hide it initially
    svgCircle.style.opacity = "0";
    svgCircle.style.transition = "opacity 1s ease-in-out";

    // trigger on first scroll
    function revealOnScroll() {
        svgCircle.style.opacity = "1";
        // remove listener so it only runs once
        window.removeEventListener("scroll", revealOnScroll);
    }

  window.addEventListener("scroll", revealOnScroll);
});

// Cookie Images Animation
/*
document.addEventListener("DOMContentLoaded", () => {
  const cookies = document.querySelector(".cookie");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Delay before showing
          setTimeout(() => {
            cookies.classList.add("visible");
          }, 500); // 500ms delay
          observer.unobserve(entry.target); // only once
        }
      });
    },
    { threshold: 0.2 } // when 20% is visible
  );

  observer.observe(cookies);
});
*/

// Cookie Images Animation - Alternative Scroll Method
document.addEventListener("DOMContentLoaded", () => {
  const cookies = document.querySelectorAll(".cookie");

  function revealCookies() {
    cookies.forEach((cookie, index) => {
      setTimeout(() => {
        cookies.classList.add("visible");
      }, index * 600); // 500ms delay between each
    });
    observer.unobserve(entry.target);
  }

  observer.observe(circle);
});

