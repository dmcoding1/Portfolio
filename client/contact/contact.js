window.onload = () => {
  // CURSOR

  const cursors = [...document.getElementsByClassName("cursor")];
  const [smallCursor, bigCursor] = cursors;

  document.addEventListener("mousemove", handleMouseMove);

  const mouseCords = { x: 0, y: 0 };

  const bigCursorCords = { x: 0, y: 0 };

  function handleMouseMove(e) {
    smallCursor.style.transform = `translate(calc(${e.pageX}px - 50%), calc(${e.pageY}px - 50%))`;

    mouseCords.x = e.pageX;
    mouseCords.y = e.pageY;
  }

  setInterval(followMouseSmooth, 50);

  function followMouseSmooth() {
    let distX = mouseCords.x - bigCursorCords.x;
    let distY = mouseCords.y - bigCursorCords.y;

    bigCursorCords.x += distX / 5;
    bigCursorCords.y += distY / 5;

    bigCursor.style.transform = `translate(calc(${bigCursorCords.x}px - 50%), calc(${bigCursorCords.y}px - 50%))`;
  }

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
};
