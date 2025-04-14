const phrases = [
    "Chatting",
    "Posting",
    "Messaging",
    "Meeting",
    "Connecting",
    "Sharing"
];

const dynamicEl = document.getElementById("dynamic");
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let delay = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        letterIndex--;
        delay = 50;
    } else {
        letterIndex++;
        delay = 100;
    }

    dynamicEl.textContent = currentPhrase.substring(0, letterIndex);

    if (!isDeleting && letterIndex === currentPhrase.length) {
        delay = 1000;
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
    }

    setTimeout(type, delay);
}

type();