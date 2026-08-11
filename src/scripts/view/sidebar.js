import projectFolderIcon from "../../icons/project-folder.svg";

import { allProjectsOpen, getAllProjects } from "../model/project-manager.js";

import {
  createIconBtn,
  createInput,
} from "../view/utilities/element-factory.js";

const tabContainer = document.querySelector("#tabs");
const newProjectTab = document.querySelector("#new-project");

const displayProjectTabs = () => {
  document.querySelector(".my-projects").className = allProjectsOpen
    ? "tab my-projects selected"
    : "tab my-projects";

  tabContainer.querySelectorAll(".project").forEach((projectTab) => {
    tabContainer.removeChild(projectTab);
  });

  getAllProjects().forEach((project) => {
    tabContainer.insertBefore(createProjectTab(project), newProjectTab);
  });
};

const createProjectTab = (project) => {
  const tab = createIconBtn(
    projectFolderIcon,
    "icon of a folder",
    "tab project",
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

export { displayProjectTabs, createProjectTab };
