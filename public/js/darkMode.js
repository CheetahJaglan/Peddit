document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("toggle");

    // Function to apply dark mode settings
    function applyDarkMode() {
        const isDarkMode = localStorage.getItem("darkMode") === "enabled";
        document.body.classList.toggle("dark-mode", isDarkMode);
        darkModeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
    }

    // Toggle dark mode and update localStorage
    function toggleDarkMode() {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }

    // Initialize dark mode on page load
    applyDarkMode();

    // Add event listener to the button
    darkModeToggle.addEventListener("click", toggleDarkMode);
});
