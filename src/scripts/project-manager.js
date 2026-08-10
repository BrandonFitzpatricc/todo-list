import { Project } from "./project.js";
import { storageAvailable, storagePopulated } from "./storage-handler.js";

let allProjectsOpen;

// Create default project when the program is first run by a new user.
let projects = [new Project("Project", true)];

const addProject = (name) => projects.push(new Project(name));

const deleteProject = (id) => {
  // prettier-ignore
  projects.splice(projects.findIndex(project => project.id === id), 1);
};

const findProject = (id) => {
  return projects.find((project) => project.id === id);
};

const toggleProject = (id) => {
  // If every project is currently open when this function is run, then that means
  // an individual project is being opened. Therefore, every project must be closed
  // before opening the target project.
  if (allProjectsOpen) {
    projects.forEach((project) => project.toggleOpenStatus("closed"));
    allProjectsOpen = false;
  }

  findProject(id).toggleOpenStatus();
};

// openStatus can be used to strictly toggle all projects either open or closed.
// If this parameter is omitted, the projects will either be opened or closed
// depending on whether or not every project is open
const toggleAllProjects = (openStatus) => {
  if (openStatus) {
    projects.forEach((project) => {
      project.toggleOpenStatus(openStatus);
    });

    allProjectsOpen = openStatus === "open" ? true : false;
  } else {
    projects.forEach((project) => {
      project.toggleOpenStatus(allProjectsOpen ? "closed" : "open");
    });

    allProjectsOpen = !allProjectsOpen;
  }
};

// The output of this function will be read by the sidebar controller and used for
// creating project tabs
const getAllProjects = () => {
  return projects;
};

// The output of this function will be read by the project display controller
// and used for displaying projects.
const getOpenProjects = () => {
  return projects.filter((project) => project.isOpen);
};

const atMaxProjects = () => projects.length === 15;

const saveProjects = () => {
  if (storageAvailable("localStorage"))
    localStorage.setItem("projects", JSON.stringify(projects));
};

const loadProjects = () => {
  if (storagePopulated()) {
    projects = [];
    // Each object stored inside of localStorage is a JSON string. They first need
    // to be parsed as object literals, and then their properties must be used
    // to reconstruct the original objects that were saved.
    JSON.parse(localStorage.getItem("projects")).forEach((savedProject) => {
      savedProject = JSON.parse(savedProject);
      const project = new Project(savedProject.name, savedProject.isOpen);

      savedProject.tasks.forEach((task) => {
        task = JSON.parse(task);
        project.addTask(
          task.name,
          task.description,
          task.date,
          task.priority,
          task.isComplete,
        );
      });

      projects.push(project);
    });
  }
};

export {
  addProject,
  deleteProject,
  findProject,
  toggleProject,
  toggleAllProjects,
  getAllProjects,
  getOpenProjects,
  atMaxProjects,
  saveProjects,
  loadProjects,
};
