const track = document.getElementById("tickerTrack");

const phrases = [
  `Peça Já no iFood!`,
  `<img src="resources/img/logo-2.5.svg" class="ticker-icon" alt="Eagle logo">`,
  `Quero o Meu Cookie!`,
  `<img src="resources/img/logo-2.5.svg" class="ticker-icon" alt="Ealgle Logo">`
];

function fillTicker() {
  track.innerHTML = ""; // clean

  // Build one full cycle
  let cycle = "";
  phrases.forEach(item => {
    cycle += `<span>${item}</span>`;
  });

  // Duplicate cycles until track is wide enough
  while (track.scrollWidth < window.innerWidth * 2) {
    track.innerHTML += cycle;
  }
}

fillTicker();
window.addEventListener("resize", fillTicker);

// Hamburger Menu Logic
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
        // Toggle the active class on both the button (for animation) and the menu
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Optional: Close menu when a link is clicked
    document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
});

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

// Logo Circle Anaimation
document.addEventListener("DOMContentLoaded", () => {
  const imgCircle = document.querySelector(".img-circle");
  const footer = document.querySelector("footer"); // <-- your footer element

  function handleScroll() {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // If footer is visible (touching or entering the screen)
    if (footerTop <= windowHeight) {
      imgCircle.classList.remove("visible");   // hide animation
    } else {
      imgCircle.classList.add("visible");      // show animation
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run on page load too
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

// Rainbow Stroke Animation on Scroll
document.addEventListener("DOMContentLoaded", () => {

    const strokes = document.querySelectorAll(".rainbow-stroke, .black-stroke");

    /* CHANGE THIS VALUE TO CONTROL SPEED
       600 means: "By the time I scroll down 600px, the lines will be gone."
       Lower number = Faster animation / Disappears sooner
       Higher number = Slower animation
    */
    const animationDistance = 600; 

    // Wait until initial CSS draw animation ends (2.4s)
    setTimeout(() => {

        strokes.forEach(path => {
            path.style.animation = 'none'; // Stop CSS control
            void path.offsetHeight; // Force update
            
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = 0;
            path.dataset.length = length;
        });

        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            
            // Math: Current Scroll divided by our Fixed Distance (600px)
            // If scroll is 300px, progress is 0.5 (50% erased)
            const progress = Math.min(scrollY / animationDistance, 1);

            strokes.forEach(path => {
                const length = path.dataset.length;
                path.style.strokeDashoffset = length * progress;
            });
        });

    }, 2500);
});

// Rainbow Stroke Animation on Scroll (sequential disappear)
document.addEventListener("DOMContentLoaded", () => {

    const blacks  = [...document.querySelectorAll(".black-stroke")];
    const colors  = [...document.querySelectorAll(".rainbow-stroke")];

    // Pair black+color vertically:
    const pairs = blacks.map((b, i) => ({
        black: b,
        color: colors[i],
    }));

    /* How far the user needs to scroll for the WHOLE rainbow to disappear */
    const totalScroll = 660; 

    /* Delay between each stripe disappearing */
    const segment = totalScroll / pairs.length;

    // ---- Wait until the CSS drawing animation ends ----
    setTimeout(() => {

        // Measure all lengths
        pairs.forEach(pair => {
            const lenBlack = pair.black.getTotalLength();
            const lenColor = pair.color.getTotalLength();

            pair.black.style.strokeDasharray = lenBlack;
            pair.black.style.strokeDashoffset = 0;
            pair.black.dataset.length = lenBlack;

            pair.color.style.strokeDasharray = lenColor;
            pair.color.style.strokeDashoffset = 0;
            pair.color.dataset.length = lenColor;

            // Stop CSS animation
            pair.black.style.animation = "none";
            pair.color.style.animation = "none";
        });

        // ---- Scroll handling ----
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;

            pairs.forEach((pair, index) => {
                // Determine how much of THIS stripe should be erased
                const start = index * segment;
                const end   = start + segment;

                let progress = (scrollY - start) / (end - start);
                progress = Math.min(Math.max(progress, 0), 1); // clamp 0–1

                // Apply erase
                const blackLength = pair.black.dataset.length;
                const colorLength = pair.color.dataset.length;

                pair.black.style.strokeDashoffset = blackLength * progress;
                pair.color.style.strokeDashoffset = colorLength * progress;
            });
        });

    }, 2500); // matches your CSS draw time

});

