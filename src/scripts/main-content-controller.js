import { createProjectDisplay } from "./element-factory.js";
import { getOpenProjects } from "./project-manager.js";
import { openNewTaskForm } from "./form-handler.js";

const mainContent = document.querySelector("#main-content");

const displayOpenProjects = () => {
    mainContent.textContent = "";
    getOpenProjects().forEach(project => {
        mainContent.appendChild(createProjectDisplay(project));
    });
}

mainContent.addEventListener("click", (event) => {
    const selectedButton = event.target;

    if(selectedButton.className === "add-task-btn") {
        openNewTaskForm(selectedButton.parentNode.parentNode);
    }
});

export { displayOpenProjects };