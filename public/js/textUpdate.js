const editor = document.getElementById("editor");
const placeholder = document.getElementById("placeholder");
const hiddenTextarea = document.getElementById("hidden-textarea");
const toggleButton = document.getElementById("toggle");

// Show/Hide placeholder when typing
editor.addEventListener("input", () => {
    placeholder.style.display = editor.innerText.trim() ? "none" : "block";
    syncTextarea();
});

function formatText(command) {
    document.execCommand(command, false, null);
    syncTextarea();
}

function syncTextarea() {
    hiddenTextarea.value = editor.innerHTML; // Store formatted HTML in hidden textarea
}

document.querySelector("form").addEventListener("submit", () => {
    syncTextarea(); // Ensure latest content is saved
});