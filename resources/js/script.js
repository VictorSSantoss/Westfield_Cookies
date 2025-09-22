// Array of words to display one by one

const words = ["Chewy.", "Crunchy.", "Delicious."];
let currentWord = 0;
let currentLetter = 0;

function showText() {
    const output = document.getElementById("output");
// Adding one letter at a time
    if (currentLetter < words[currentWord].length) {
        output.textContent += words[currentWord][currentLetter];
        currentLetter++;
        setTimeout(showText, 600); // Adjust typing speed here
    } else {
        currentLetter++;
        currentLetter = 0;
    }

// Move to next word
    if (currentWord < words.length) {
        setTimeout(() => {
            output.textContent = "";
            showText();
        }, 4000); // Wait before showing next word
    } 
}

// Start animation


