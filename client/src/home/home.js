import "../scripts/cursor";
import "../scripts/nav";

import "./home.scss";
import "../font/font.scss";


window.onload = () => {
  const letterContainer = document.querySelector(".header__title");

  divideTextInNode(letterContainer);

  const letters = [...document.querySelectorAll(".header__letter")];

  document.body.addEventListener("click", (e) => {
    showBigLetter(e);
  });

  letterContainer.addEventListener("mouseover", (e) => {
    if (detectLeftButton(e)) {
      showBigLetter(e);
    }
  });

  function detectLeftButton(e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return false;
    } else if ("buttons" in event) {
      return e.buttons === 1;
    } else if ("which" in event) {
      return e.which === 1;
    } else {
      return e.button == 1 || e.type == "click";
    }
  }

  function divideTextInNode(htmlNode) {
    const headerTitleChars = htmlNode.textContent.trim().split("");

    const headerTitleHtml = headerTitleChars.reduce((html, character) => {
      if (/[A-Za-z]/.test(character)) {
        return (html += `<span class="header__letter" data-content=${character}>${character}</span
        >`);
      } else {
        return (html += character);
      }
    }, "");

    htmlNode.textContent = "";
    htmlNode.innerHTML = headerTitleHtml;
  }

  function showBigLetter(e) {
    letters.forEach((letter) => letter.classList.remove("header__letter--big"));
    if (e.target.classList.contains("header__letter"))
      e.target.classList.add("header__letter--big");
  }
};
