const SWATCH_COUNT = 5;

const paletteEl = document.getElementById("palette");
const generateBtn = document.getElementById("generate");
const toastEl = document.getElementById("toast");

// Random hex colour: a number from 0 to 16,777,215 (0xFFFFFF) turned into 6 hex digits
function randomHex() {
  const n = Math.floor(Math.random() * 0x1000000);
  return "#" + n.toString(16).padStart(6, "0").toUpperCase();
}

// Pick dark or light text so the code stays readable on any swatch colour
function textColorFor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#0b2a5b" : "#ffffff";
}

let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
}

// Clipboard API needs a secure context (https or localhost); fall back to execCommand otherwise
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "");
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(temp);
  if (!ok) throw new Error("Copy failed");
}

async function handleCopy(hex) {
  try {
    await copyText(hex);
    showToast("Copied " + hex);
  } catch (err) {
    showToast("Could not copy. Select the code and copy it manually.");
  }
}

function render(colors) {
  paletteEl.innerHTML = "";
  colors.forEach((hex) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "swatch";
    swatch.style.backgroundColor = hex;
    swatch.style.color = textColorFor(hex);
    swatch.setAttribute("aria-label", "Copy color " + hex);

    const code = document.createElement("span");
    code.className = "code";
    code.textContent = hex;

    const hint = document.createElement("span");
    hint.className = "hint";
    hint.textContent = "Click to copy";

    const label = document.createElement("span");
    label.append(code, hint);
    swatch.appendChild(label);

    swatch.addEventListener("click", () => handleCopy(hex));
    paletteEl.appendChild(swatch);
  });
}

function generatePalette() {
  const colors = Array.from({ length: SWATCH_COUNT }, randomHex);
  render(colors);
}

generateBtn.addEventListener("click", generatePalette);

// Space bar makes a new palette (unless a button is focused, where space already clicks it)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && document.activeElement === document.body) {
    e.preventDefault();
    generatePalette();
  }
});

generatePalette();