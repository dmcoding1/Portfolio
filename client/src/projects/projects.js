import "../scripts/cursor";
import "../scripts/focus-within-polyfill";
import "../scripts/nav";
import projectsData from "../scripts/projectsData";
import registerSW from "../scripts/swRegistration";

import "./projects.scss";
import "../font/font.scss";

window.onload = () => {

  const projectsContainer = document.querySelector(
    ".projects__carousel-wrapper"
  );

  if (window.innerWidth <= 700) {
    generateProjects(projectsData);
    document.body.classList.remove("loading");
    return;
  }

  const numberOfProjects = projectsData.length;

  generateProjects(projectsData);

  const projects = document.getElementsByClassName("projects__project");

  let projectsOrder = [...projects];

  const positions = projectsOrder.map((project, index) => {
    switch (index) {
      case 0:
        return {
          x: "-50%",
          y: "-50%",
          z: "0",
        };
      case 1:
        return {
          x: "0",
          y: "-125%",
          z: "-200px",
        };
      case numberOfProjects - 1:
        return {
          x: "-150%",
          y: "-125%",
          z: "-200px",
        };
      default: {
        return {
          x: "-100%",
          y: "-225%",
          z: "-400px",
        };
      }
    }
  });

  projectsOrder.forEach((project, index) => {
    translateToPosition(project, positions[index]);
    const imageUrl = projectsData[index].imageUrl;    
    project.style.backgroundImage = `url(${imageUrl})`;
  });

  [...projects].forEach((project) => {
    project.addEventListener("transitionend", () => {
      if (projectsOrder.indexOf(project) === 0) {
        project.classList.add("active");
      }
    });
  });

  const rightBtn = document.getElementById("right");
  rightBtn.addEventListener("click", handleTranslate);
  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") handleTranslate();
  });

  const leftBtn = document.getElementById("left");
  leftBtn.addEventListener("click", (e) => handleTranslate(e, "left"));
  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") handleTranslate(e, "left");
  });

  const carousel = document.querySelector(".projects__carousel-wrapper");

  carousel.addEventListener("click", swapProjects);
  carousel.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === "Space") {
      swapProjects(e);
    }
  });

  // TOOLS

  const toolsContainer = document.querySelector(".tools");

  let toolsOrder = projectsData.map(({ tools }) => tools);

  displayTools(toolsOrder);

  const toolsItems = document.getElementsByClassName("tools__item");

  translateTools(toolsItems);

  document.body.classList.remove("loading");

  // FUNCTIONS

  function displayTools([toolsArr]) {
    toolsContainer.innerHTML = toolsArr
      .map((tool) => `<span class="tools__item">${tool}</span>`)
      .join("");
  }

  function generateProjects(data) {
    const projectsHTML = data.reduce((html, project) => {
      const figmaHTML = project.figmaLink
        ? `<a href=${project.figmaLink} aria-label="View the design on Figma"><img src="../images/figma.svg"
      alt="figma logo" /></a>`
        : "";

      return (html += `<div class="projects__project" tabindex=0>
      <div class="card">
        <a href=${project.link} aria-label=${project.label}>
          <h3 class="card__title">${project.title}</h3>
          <p class="card__description">${project.description}</p>
        </a>
        <div class="card__links">
          <a href=${project.githubLink} aria-label="View the code on github"><svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)" fill="#FFFFFF" />
            </svg></a>
          ${figmaHTML}
        </div>
      </div>
    </div>`);
    }, "");

    projectsContainer.innerHTML = projectsHTML;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleTranslate(e, direction = "right") {
    let vergingIndex = direction === "left" ? 0 : numberOfProjects - 1;
    let changingIndex = direction === "left" ? numberOfProjects - 1 : 0;
    let valueAddedToIndex = direction === "left" ? -1 : 1;

    let order = Array(numberOfProjects);

    projectsOrder.forEach((project, index) => {
      if (index === vergingIndex) {
        order[changingIndex] = project;
        translateToPosition(project, positions[changingIndex]);

        return;
      }

      order[index + valueAddedToIndex] = project;
      translateToPosition(project, positions[index + valueAddedToIndex]);
    });

    let tmpToolsOrder = Array(numberOfProjects);

    toolsOrder.forEach((tool, index) => {
      if (index === vergingIndex) {
        tmpToolsOrder[changingIndex] = tool;
        return;
      }

      tmpToolsOrder[index + valueAddedToIndex] = tool;
    });

    setProjectActive(order[0]);

    projectsOrder = [...order];

    toolsOrder = [...tmpToolsOrder];

    displayTools(toolsOrder);

    translateTools(toolsItems);
  }

  function setProjectActive() {
    [...projects].forEach((project) => {
      project.classList.remove("active");
    });
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

  function translateTools(htmlNodeList) {
    [...htmlNodeList].forEach(
      (tool) =>
        (tool.style.transform = `translateY(${getRandomInt(-100, 100)}%`)
    );
  }

  function translateToPosition(project, { x, y, z }) {
    project.style.transform = `perspective(400px) translate3d(${x}, ${y}, ${z})`;
  }
};

registerSW();