const cEditor = document.getElementById("cEditor");
const cPlaceholder = document.getElementById("cPlaceholder");
const hiddenCTextarea = document.getElementById("hidden-cTextarea");
const toggleButton = document.getElementById("toggle");

// Show/Hide placeholder when typing
cEditor.addEventListener("input", () => {
    cPlaceholder.style.display = cEditor.innerText.trim() ? "none" : "block";
    syncTextarea();
});

function formatText(command) {
    document.execCommand(command, false, null);
    syncTextarea();
}

function syncTextarea() {
    hiddenCTextarea.value = cEditor.innerHTML; // Store formatted HTML in hidden textarea
}

document.querySelector("form").addEventListener("submit", () => {
    syncTextarea(); // Ensure latest content is saved
});