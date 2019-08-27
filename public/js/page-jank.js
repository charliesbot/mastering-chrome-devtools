const appRoot = document.getElementById("root");
const addButton = document.querySelector(".add");
const removeButton = document.querySelector(".remove");
const originalLogo = document.querySelector(".jank-logo");

let rAF;
let allLogos;
let count = 10;
let distance = 3;
let bodySize = document.body.getBoundingClientRect();
document.body.style.overflowY = "hidden";
let logoSize = originalLogo.getBoundingClientRect();
let maxHeight = Math.floor(bodySize.height - logoSize.height);
const translations = [];

function init() {
  if (allLogos) {
    bodySize = document.body.getBoundingClientRect();
    for (let i = 0; i < allLogos.length; i++) {
      document.body.removeChild(allLogos[i]);
    }
    document.body.appendChild(originalLogo);
    logoSize = originalLogo.getBoundingClientRect();
    document.body.removeChild(originalLogo);
    maxHeight = Math.floor(bodySize.height - logoSize.height);
  }

  for (let i = 0; i < count; i++) {
    let newLogo = originalLogo.cloneNode();
    let top = Math.floor(Math.random() * maxHeight);
    if (top >= maxHeight) {
      newLogo.classList.add("up");
    } else {
      newLogo.classList.add("down");
    }
    const left = i / (count / 97);
    translations.push({ top, left });
    newLogo.style.transform = `translate(${left}vw, ${top}px)`;
    newLogo.style.top = 0;
    document.body.appendChild(newLogo);
  }

  allLogos = Array.from(document.querySelectorAll(".jank-logo"));
  count = allLogos.length;
}

function move() {
  allLogos.forEach((currentLogo, index) => {
    const top = currentLogo.getBoundingClientRect().top;
    let currentLogoPosition = currentLogo.classList.contains("down")
      ? top + distance
      : top - distance;

    if (currentLogoPosition < 0) {
      currentLogoPosition = 0;
    }

    if (currentLogoPosition > maxHeight) {
      currentLogoPosition = maxHeight;
    }

    translations[index] = { ...translations[index], top: currentLogoPosition };
  });

  allLogos.forEach((currentLogo, index) => {
    const translation = translations[index];
    if (translation.top <= 0) {
      currentLogo.classList.remove("up");
      currentLogo.classList.add("down");
    }

    if (translation.top >= maxHeight) {
      currentLogo.classList.remove("down");
      currentLogo.classList.add("up");
    }
    currentLogo.style.transform = `translate(${translation.left}vw, ${translation.top}px)`;
  });
  rAF = window.requestAnimationFrame(move);
}

addButton.addEventListener("click", () => {
  count = count + 50;
  init();
});

removeButton.addEventListener("click", () => {
  if (count >= 50) {
    count = count - 50;
  }
  init();
});

window.addEventListener("resize", () => {
  init();
});

window.addEventListener("load", () => {
  appRoot.removeChild(originalLogo);
  init();
  rAF = window.requestAnimationFrame(move);
});
