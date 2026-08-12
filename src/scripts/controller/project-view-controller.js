import { displayOpenProjects } from "../view/project-view.js";
import { displayTabs } from "../view/sidebar.js";

import { deleteProject, findProject } from "../model/project-manager.js";

import { openNewTaskDialog } from "./new-task-dialog-controller.js";
import { initializeExpandedTask } from "./expanded-task-view-controller.js";

const initializeProjectView = () => {
  displayOpenProjects();

  document.querySelector("#main-content").addEventListener("click", (event) => {
    const selectedButton = event.target;
    // The project display corresponding to the button that was selected is stored in order to
    // allow that project to be accessed and modified accordingly.
    const selectedProjectDisplay = selectedButton.closest(".project");

    // This callback function should only run when a button is selected from a project display.
    // If this returns true, then it means that a button is instead being selected from an
    // expanded task.
    if (!selectedProjectDisplay) return;

    const selectedProject = findProject(selectedProjectDisplay.dataset.id);

    const buttonHandler = {
      "add-task-btn": () => openNewTaskDialog(selectedProject),

      "edit-project-btn": () =>
        editProjectName(selectedProject, selectedProjectDisplay),

      "delete-project-btn": () => {
        deleteProject(selectedProject.id);
        displayOpenProjects();
        displayTabs();
      },

      "delete-task-btn": () => {
        const taskDisplay = selectedButton.parentNode;
        selectedProject.deleteTask(taskDisplay.dataset.id);
        displayOpenProjects();
      },

      "expand-task-btn": () => {
        const taskDisplay = selectedButton.parentNode;
        initializeExpandedTask(
          selectedProject,
          selectedProject.findTask(taskDisplay.dataset.id),
        );
      },

      "task-checkbox": () => {
        const taskDisplay = selectedButton.parentNode;
        selectedProject.findTask(taskDisplay.dataset.id).toggleCompletion();
      },
    };

    // The first class name of each button will correspond to
    // one of the button handler properties.
    buttonHandler[selectedButton.className.split(" ")[0]]();
  });
};

function editProjectName(project, projectDisplay) {
  const projectNameInput = projectDisplay.querySelector(".project-name");
  projectNameInput.readOnly = false;

  // When this function runs, the cursor will be automatically placed at the end
  // of the project name input.
  const projectNameLength = projectNameInput.value.length;
  projectNameInput.setSelectionRange(projectNameLength, projectNameLength);

  projectNameInput.focus();
  ["blur", "keydown"].forEach((eventType) => {
    projectNameInput.addEventListener(eventType, (event) => {
      if (event.type === "blur" || event.key === "Enter") {
        projectNameInput.value = projectNameInput.value.trim()
          ? projectNameInput.value
          : "Project";

        project.name = projectNameInput.value;
        projectNameInput.readOnly = true;
        displayTabs();
      }
    });
  });
}

export { initializeProjectView };
