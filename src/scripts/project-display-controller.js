import { createProjectDisplay } from "./element-factory.js";
import { displayProjectTabs } from "./sidebar-controller.js";
import { displayExpandedTask } from "./expanded-task-controller.js";
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

    if(!selectedProjectDisplay) return;
    
    const selectedProject = findProject(selectedProjectDisplay.dataset.id);

    const buttonHandler = {
        "add-task-btn": () => openNewTaskForm(selectedProject),

        "edit-project-btn": () => editProjectName(selectedProject, selectedProjectDisplay),

        "delete-project-btn": () => {
            deleteProject(selectedProject.id);
            displayOpenProjects();
            displayProjectTabs();
        },

        "delete-task-btn": () => {
            const taskDisplay = selectedButton.parentNode;
            selectedProject.deleteTask(taskDisplay.dataset.id);
            displayOpenProjects();
        },

        "expand-task-btn": () => {
            const taskDisplay = selectedButton.parentNode;
            displayExpandedTask(selectedProject.findTask(taskDisplay.dataset.id));
        }
    }

    buttonHandler[selectedButton.className]();
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

export { displayOpenProjects };