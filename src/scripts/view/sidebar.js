import {
  projectFoldersIcon,
  projectFolderIcon,
  newProjectIcon,
} from "./utilities/icon-manager.js";

import { allProjectsOpen, getAllProjects } from "../model/project-manager.js";

import {
  createIconBtn,
  createInput,
  createTextElement,
} from "../view/utilities/element-factory.js";

const tabContainer = document.querySelector("#tabs");

const displayTabs = () => {
  tabContainer.textContent = "";

  tabContainer.appendChild(createHeadingTab());

  getAllProjects().forEach((project) => {
    tabContainer.appendChild(createProjectTab(project));
  });

  tabContainer.appendChild(createNewProjectTab());
};

const createProjectTab = (project) => {
  const tab = createIconBtn(
    projectFolderIcon,
    "icon of a folder",
    "tab project",
    "40",
  );

  // prettier-ignore
  if(project) tab.className += ` ${project.isOpen && !allProjectsOpen ? "selected" : ""}`

  tab.dataset.id = project ? project.id : "";

  // The project name is created as an input rather than a div to allow it to be editable.
  const projectName = createInput(
    "name project-name",
    "text",
    project ? project.name : "",
    "24",
  );

  // Note: project tabs can be created without passing in a project object. The purpose
  // of these tabs is to provide a clean interface for users to enter a project name.
  if (!project) {
    projectName.readOnly = false;
    tab.disabled = true;
  }

  tab.appendChild(projectName);

  return tab;
};

function createHeadingTab() {
  const tab = createIconBtn(
    projectFoldersIcon,
    "icon of a folder with subfolders",
    `tab my-projects ${allProjectsOpen ? "selected" : ""}`,
    "45",
  );

  tab.id = "my-projects";

  const headingText = createTextElement(
    "div",
    "sidebar-heading",
    "My Projects",
  );

  tab.append(headingText);

  return tab;
}

function createNewProjectTab() {
  const tab = createIconBtn(
    newProjectIcon,
    "icon of a plus sign",
    "tab new-project",
    "40",
  );

  tab.id = "new-project";

  const tabText = createTextElement("div", "", "New Project");

  tab.append(tabText);

  return tab;
}

export { displayTabs, createProjectTab };
