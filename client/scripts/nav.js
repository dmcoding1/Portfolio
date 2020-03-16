  // Direction aware navbar hover

  const navLinks = document.querySelectorAll(".nav__link");

  for (let link of navLinks) {
    link.addEventListener("mouseenter", e => {
      const linkRect = link.getBoundingClientRect();
      const edge = getMouseEnterSide(e.pageX, linkRect);

      if (edge === "left") {
        link.classList.remove("in-right", "in-top", "in-bottom");
        link.classList.add("in-left");
      } else {
        link.classList.remove("in-left", "in-top", "in-bottom");
        link.classList.add("in-right");
      }
    });

    link.addEventListener("mouseleave", e => {
      const linkRect = link.getBoundingClientRect();
      const edge = getMouseEnterSide(e.pageX, linkRect);

      if (edge === "left") {
        link.classList.remove("in-left", "in-top", "in-bottom");
        link.classList.add("in-right");
      } else {
        link.classList.remove("in-right", "in-top", "in-bottom");
        link.classList.add("in-left");
      }
    });
  }

  function getMouseEnterSide(x, { left, right }) {
    const leftEdgeDistance = x - left;
    const rightEdgeDistance = right - x;

    return leftEdgeDistance < rightEdgeDistance ? "left" : "right";
  }
