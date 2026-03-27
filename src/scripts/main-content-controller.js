import { createProjectDisplay, createExpandedTaskDisplay } from "./element-factory.js";
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
    // The project corresponding to the button that was selected is stored in order to
    // allow that project to be accessed and modified accordingly.
    const selectedProjectDisplay = selectedButton.closest(".project");
    const selectedProject = findProject(selectedProjectDisplay.dataset.id);
    
    if(selectedButton.className === "add-task-btn") {
        openNewTaskForm(selectedProject);

    } else if(selectedButton.className === "edit-project-btn") {
        editProjectName(selectedProject, selectedProjectDisplay);

    } else if(selectedButton.className === "delete-project-btn") {
        deleteProject(selectedProject.id);
        displayOpenProjects();
        displayProjectTabs();

    } else if(selectedButton.className === "delete-task-btn") {
        const taskDisplay = selectedButton.parentNode;
        selectedProject.deleteTask(taskDisplay.dataset.id);
        displayOpenProjects();

    } else if(selectedButton.className === "expand-task-btn") {
        const taskDisplay = selectedButton.parentNode;
        displayExpandedTask(selectedProject.findTask(taskDisplay.dataset.id));
    }
});

function editProjectName(project, projectDisplay) {
    const projectNameInput = projectDisplay.querySelector(".project-name");
    projectNameInput.readOnly = false;

    const projectNameLength = projectNameInput.value.length;
    projectNameInput.setSelectionRange(projectNameLength, projectNameLength);

    projectNameInput.focus();
    ["blur", "keydown"].forEach(eventType => {
        projectNameInput.addEventListener(eventType, (event) => {
            if(event.type === "blur" || event.key === "Enter") {
                project.name = projectNameInput.value;
                projectNameInput.readOnly = true;
                displayProjectTabs();
            }
        });
    });
}

function displayExpandedTask(task) {
    mainContent.textContent = "";
    mainContent.appendChild(
        createExpandedTaskDisplay(task)
    );
}

export { displayOpenProjects };