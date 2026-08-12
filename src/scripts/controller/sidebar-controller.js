import { displayTabs, createProjectTab } from "../view/sidebar";
import { displayOpenProjects } from "../view/project-view.js";

import {
  addProject,
  toggleProject,
  toggleAllProjects,
  atMaxProjects,
  closeAllProjects,
} from "../model/project-manager.js";

const tabs = document.querySelector("#tabs");
const newProjectTab = tabs.querySelector("#new-project");

const initializeSidebar = () => {
  displayTabs();

  tabs.addEventListener("click", (event) => {
    const tab = event.target;

    if (tab.id !== "new-project") {
      selectProjectTab(tab);
    } else if (!atMaxProjects()) {
      createNewProject();
    }
  });
};

function createNewProject() {
  // projectNameTab is a dummy tab that does not contain any project information.
  // It simply provides a clean interface for users to enter the name of a new project
  // and facilitate the creation of that project.
  const projectNameTab = createProjectTab(null);
  tabs.insertBefore(projectNameTab, document.querySelector("#new-project"));

  const projectNameInput = projectNameTab.querySelector(".project-name");
  projectNameInput.focus();
  ["blur", "keydown"].forEach((eventType) => {
    projectNameInput.addEventListener(eventType, submitProjectName);
  });

  function submitProjectName(event) {
    if (event.type === "blur" || event.key === "Enter") {
      addProject(projectNameInput.value);
      // Submitting the project name through the enter key will fire a blur event.
      // Therefore, this event listener is removed after submission to ensure that
      // this callback function does not run twice.
      projectNameInput.removeEventListener("blur", submitProjectName);
      displayTabs();

      // The project that was just created should be automatically opened individually.
      closeAllProjects();
      const projectTabs = tabs.querySelectorAll(".project");
      selectProjectTab(projectTabs[projectTabs.length - 1]);

      if (atMaxProjects()) newProjectTab.className += " hidden";
    }
  }
}

function selectProjectTab(tab) {
  if (tab.id === "my-projects") {
    toggleAllProjects();
  } else {
    toggleProject(tab.dataset.id);
  }

  displayOpenProjects();
  displayTabs();
}

export { initializeSidebar };
