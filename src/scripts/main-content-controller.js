import { createProjectDisplay } from "./element-factory.js";
import { getOpenProjects } from "./project-manager.js";

const mainContent = document.querySelector("#main-content");

const displayOpenProjects = () => {
    mainContent.textContent = "";
    getOpenProjects().forEach(project => {
        mainContent.appendChild(createProjectDisplay(project));
    });
}

export { displayOpenProjects };