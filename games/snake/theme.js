// theme.js
function applyTheme() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "dark"; // default theme

  let body = document.body;

  if (theme === "dark") {
    body.style.background = "linear-gradient(135deg, #000000, #0a1a40)";
  }

  if (theme === "retro") {
    body.style.background = "linear-gradient(135deg, #000000, #1a1a1a, #003366, #660033)";
    body.style.backgroundSize = "400% 400%";
    body.style.animation = "gradientShift 15s ease infinite";
  }

  if (theme === "neon") {
    body.style.background = "linear-gradient(135deg, #00ffcc, #6600ff, #ff0066)";
    body.style.backgroundSize = "400% 400%";
    body.style.animation = "gradientShift 10s ease infinite";
  }
}

// add animation if needed
const style = document.createElement("style");
style.textContent = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
document.head.appendChild(style);

// run on load
window.addEventListener("DOMContentLoaded", applyTheme);
