// Ticker Track
const track = document.getElementById("tickerTrack");

const phrases = [
  `Peça Já no iFood!`,
  `<img src="resources/img/logo-2.5.svg" class="ticker-icon" alt="Eagle logo">`,
  `Quero o Meu Cookie!`,
  `<img src="resources/img/logo-2.5.svg" class="ticker-icon" alt="Ealgle Logo">`
];

// FIX: Wrap Ticker logic in a check to ensure 'track' exists before using it.
if (track) {
    function fillTicker() {
      // Check again inside the function just in case
      if (!track) return; 

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
}




// All remaining DOM manipulation logic should be inside DOMContentLoaded.
document.addEventListener("DOMContentLoaded", () => {
    
    /* ---------------------------------- */
    /* 1. HAMBURGER MENU LOGIC (FIXED)    */
    /* ---------------------------------- */
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    // FIX: Only add event listeners if both elements exist
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Toggle the active class on both the button (for animation) and the menu
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    /* ---------------------------------- */
    /* 2. LOGO CIRCLE ANIMATION (ROBUST)  */
    /* ---------------------------------- */
    const imgCircle = document.querySelector(".img-circle");
    const footer = document.querySelector("footer");

    // FIX: Only run if both elements exist
    if (imgCircle && footer) {
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
    }


    /* ---------------------------------- */
    /* 3. COOKIE ON HOVER SWAP (USER CODE) */
    /* ---------------------------------- */
    const catalogItems = document.querySelectorAll(".catalog-item");

    catalogItems.forEach(item => {
      const cookie = item.querySelector(".cookie-img-swap");

      if (!cookie) return; // skip if no cookie image

      const originalSrc = cookie.getAttribute("src");
      const hoverSrc = cookie.getAttribute("data-hover");

      item.addEventListener("mouseenter", () => {
        cookie.setAttribute("src", hoverSrc);
      });

      item.addEventListener("mouseleave", () => {
        cookie.setAttribute("src", originalSrc);
      });
    });

    /* ---------------------------------- */
    /* 4. RAINBOW STROKE ANIMATION (ROBUST) */
    /* ---------------------------------- */
    const strokes = document.querySelectorAll(".rainbow-stroke, .black-stroke");
    const animationDistance = 600; 

    if (strokes.length > 0) {
      // Wait until initial CSS draw animation ends (2.4s)
      setTimeout(() => {

          strokes.forEach(path => {
              // Ensure path has necessary methods before calling
              if (typeof path.getTotalLength === 'function') {
                path.style.animation = 'none';
                void path.offsetHeight;
                
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = 0;
                path.dataset.length = length;
              }
          });

          window.addEventListener("scroll", () => {
              const scrollY = window.scrollY;
              const progress = Math.min(scrollY / animationDistance, 1);

              strokes.forEach(path => {
                  const length = path.dataset.length;
                  if (length) { // Check if dataset.length was set
                      path.style.strokeDashoffset = length * progress;
                  }
              });
          });

      }, 2500);
    }
    
    
    /* ---------------------------------- */
    /* 5. RAINBOW STROKE ANIMATION (Sequential - ROBUST) */
    /* ---------------------------------- */
    const blacks  = [...document.querySelectorAll(".black-stroke")];
    const colors  = [...document.querySelectorAll(".rainbow-stroke")];

    // FIX: Check if we have matching pairs before proceeding
    if (blacks.length > 0 && blacks.length === colors.length) {
        // Pair black+color vertically:
        const pairs = blacks.map((b, i) => ({
            black: b,
            color: colors[i],
        }));

        const totalScroll = 360; 
        const segment = totalScroll / pairs.length;

        // ---- Wait until the CSS drawing animation ends ----
        setTimeout(() => {

            // Measure all lengths
            pairs.forEach(pair => {
                if (typeof pair.black.getTotalLength === 'function' && typeof pair.color.getTotalLength === 'function') {
                  
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
                }
            });

            // ---- Scroll handling ----
            window.addEventListener("scroll", () => {
                const scrollY = window.scrollY;

                pairs.forEach((pair, index) => {
                    if (!pair.black.dataset.length) return; // Skip if initial length not set

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
    }
});

// The following function is not used but kept for completeness
function showText() {
    const output = document.getElementById("output");
}

// .c-btn-magnetic
const btn = document.querySelector('.c-btn-magnetic');
const fill = document.querySelector('.c-btn-magnetic__fill');

btn.addEventListener('mouseenter', (e) => {
    // Get mouse position relative to the button
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the position of the fill element
    fill.style.left = `${x}px`;
    fill.style.top = `${y}px`;

    // Expand the fill to cover the button (using a large enough value)
    // 300% is usually safe to cover corners
    fill.style.width = '300%';
    fill.style.height = '300%';
    
    // Randomize color to match the video vibe (optional)
    const colors = ['#FE6F1F', '#6BC4A6', '#70876A'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    fill.style.backgroundColor = randomColor;
});

btn.addEventListener('mouseleave', (e) => {
    // Get mouse position relative to the button
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the fill to the exit point
    fill.style.left = `${x}px`;
    fill.style.top = `${y}px`;

    // Shrink the fill back to 0
    fill.style.width = '0';
    fill.style.height = '0';
});