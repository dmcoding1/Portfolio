window.onload = () => {
  
  const letterContainer = document.querySelector(".header__title");
  const letters = document.querySelectorAll(".header__letter");
  
  document.body.addEventListener("click", e => {
    showBigLetter(e);
  });

  letterContainer.addEventListener("mouseover", e => {
    if (detectLeftButton(e)) {
      showBigLetter(e);
    }
  });

  function showBigLetter(e) {
    [...letters].forEach(letter =>
      letter.classList.remove("header__letter--big")
    );
    if (e.target.classList.contains("header__letter"))
      e.target.classList.add("header__letter--big");
  }

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
};

