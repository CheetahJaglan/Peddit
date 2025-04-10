// Auto dismiss after 5 seconds
setTimeout(() => {
  document.querySelectorAll(".flash").forEach((flash) => {
    flash.classList.add("fade-out");
    setTimeout(() => flash.remove(), 500);
  });
}, 5000);
