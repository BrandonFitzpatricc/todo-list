import { createProjectDisplay, createProjectTab } from "./element-factory.js";

import { getAllProjects, getOpenProjects } from "./project-manager.js";

const mainContent = document.querySelector("#main-content");

const displayOpenProjects = () => {
    mainContent.textContent = "";
    getOpenProjects().forEach(project => {
        mainContent.appendChild(createProjectDisplay(project));
    });
}

export { displayOpenProjects };