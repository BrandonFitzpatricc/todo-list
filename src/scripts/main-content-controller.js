import { createProjectDisplay } from "./element-factory.js";
import { displayProjectTabs } from "./sidebar-controller.js";
import { deleteProject, findProject, getOpenProjects } from "./project-manager.js";
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
    // The project display corresponding to the button that was selected is stored to
    // indicate which project is being modified, which will be accessed through its ID.
    const currentProjectDisplay = selectedButton.parentNode.parentNode;

    if(selectedButton.className === "add-task-btn") {
        openNewTaskForm(currentProjectDisplay);
    } else if(selectedButton.className === "edit-project-btn") {
        editProjectName(currentProjectDisplay);
    } else if(selectedButton.className === "delete-project-btn") {
        deleteProject(currentProjectDisplay.dataset.id);
        displayOpenProjects();
        displayProjectTabs();
    }


});

function editProjectName(projectDisplay) {
    const projectNameInput = projectDisplay.querySelector(".project-name");
    projectNameInput.readOnly = false;

    const projectNameLength = projectNameInput.value.length;
    projectNameInput.setSelectionRange(projectNameLength, projectNameLength);

    projectNameInput.focus();
    ["blur", "keydown"].forEach(eventType => {
        projectNameInput.addEventListener(eventType, (event) => {
            if(event.type === "blur" || event.key === "Enter") {
                findProject(projectDisplay.dataset.id).name = projectNameInput.value;
                projectNameInput.readOnly = true;
                displayProjectTabs();
            }
        });
    });
}

export { displayOpenProjects };