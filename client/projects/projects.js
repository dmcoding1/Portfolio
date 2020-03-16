window.onload = () => {

  const toolsContainer = document.querySelector(".tools");

  const tools = [
    [
      "html5",
      "css3",
      "sass",
      "javascript",
      "nodejs",
      "express",
      "mongoDB",
      "webpack"
    ],
    [
      "html5",
      "css3",
      "sass",
      "javascript",
      "react",
      "react hooks",
      "context API",
      "nodejs",
      "express"
    ],
    [
      "html5",
      "css3",
      "sass",
      "javascript",
      "react",
      "react hooks",
      "context API",
      "typescript",
      "unsplash API"
    ],
    ["html5", "css3", "sass", "javascript"]
  ];

  let toolsOrder = [tools[1], tools[2], tools[3], tools[0]];

  const toolsItems = document.getElementsByClassName("tools__item");

  translateTools(toolsItems);

  function displayTools([toolsArr]) {
    toolsContainer.innerHTML = toolsArr
      .map(tool => `<span class="tools__item">${tool}</span>`)
      .join("");
  }

  function translateTools(htmlNodeList) {
    [...htmlNodeList].forEach(
      tool => (tool.style.transform = `translateY(${getRandomInt(-100, 100)}%`)
    );
  }

  const projects = document.getElementsByClassName("projects__project");

  let projectsOrder = [projects[1], projects[2], projects[3], projects[0]];

  const positions = [
    {
      x: "-50%",
      y: "-50%",
      z: "0"
    },
    {
      x: "0",
      y: "-125%",
      z: "-200px"
    },
    {
      x: "-100%",
      y: "-225%",
      z: "-400px"
    },
    {
      x: "-150%",
      y: "-125%",
      z: "-200px"
    }
  ];

  const rightBtn = document.getElementById("right");
  rightBtn.addEventListener("click", () => handleTranslate());
  const leftBtn = document.getElementById("left");
  leftBtn.addEventListener("click", e => handleTranslate(e, "left"));

  function handleTranslate(e, direction = "right") {
    let vergingIndex = direction === "left" ? 0 : 3;
    let changingIndex = direction === "left" ? 3 : 0;
    let valueAddedToIndex = direction === "left" ? -1 : 1;

    let order = Array(4);

    projectsOrder.forEach((project, index) => {
      if (index === vergingIndex) {
        order[changingIndex] = project;
        translateToPosition(project, positions[changingIndex]);

        return;
      }

      order[index + valueAddedToIndex] = project;
      translateToPosition(project, positions[index + valueAddedToIndex]);
    });

    let tmpOrderTools = Array(4);

    toolsOrder.forEach((tool, index) => {
      if (index === vergingIndex) {
        tmpOrderTools[changingIndex] = tool;
        return;
      }

      tmpOrderTools[index + valueAddedToIndex] = tool;
    });

    setProjectActive(order[0]);

    projectsOrder = [...order];

    toolsOrder = [...tmpOrderTools];

    displayTools(toolsOrder);

    translateTools(toolsItems);
  }

  function translateToPosition(project, position = {}) {
    const { x, y, z } = position;

    project.style.transform = `perspective(400px) translate3d(${x}, ${y}, ${z})`;
  }

  function swapProjects(e) {
    if (
      !e.target.classList.contains("projects__project") ||
      e.target === projectsOrder[0]
    )
      return;

    let currentIndex = projectsOrder.indexOf(e.target);

    let currentProject = projectsOrder[0];

    let currentTool = toolsOrder[0];

    projectsOrder[0] = e.target;

    toolsOrder[0] = toolsOrder[currentIndex];

    projectsOrder[currentIndex] = currentProject;

    toolsOrder[currentIndex] = currentTool;

    translateToPosition(e.target, positions[0]);

    translateToPosition(currentProject, positions[currentIndex]);

    setProjectActive();

    displayTools(toolsOrder);

    translateTools(toolsItems);
  }

  const carousel = document.querySelector(".projects__carousel-wrapper");

  carousel.addEventListener("click", swapProjects);
  carousel.addEventListener("keyup", e => {
    if (e.key === "Enter" || e.key === "Space") {
      swapProjects(e);
    }
  });

  [...projects].forEach(project => {
    project.addEventListener("transitionend", () => {
      if (projectsOrder.indexOf(project) === 0) {
        project.classList.add("active");
      }
    });
  });

  function setProjectActive() {
    [...projects].forEach(project => {
      project.classList.remove("active");
    });
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  document.body.classList.remove("loading");
};
