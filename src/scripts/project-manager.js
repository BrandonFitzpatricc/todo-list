import { Project } from "./project.js";
import { Task } from "./task.js";
import { storageAvailable, storagePopulated } from "./storage-handler.js";

let allProjectsOpen;

// Create default project when the program is first run by a new user.
let projects = [new Project("Project", true)];

const saveProjects = () => {
    if(storageAvailable) localStorage.setItem("projects", JSON.stringify(projects));
};

const loadProjects = () => {
    if(storagePopulated) {
        projects = JSON.parse(localStorage.getItem("projects"));

        // Each object will be parsed from local storage as object literals rather than
        // class objects. Therefore, their class prototypes must be reassigned to give them
        // access to their methods.
        projects.forEach(project => {
            Object.setPrototypeOf(project, Project.prototype);
            project.tasks.forEach(task => Object.setPrototypeOf(task, Task.prototype));
        });
    }
}

const addProject = (name) => projects.push(new Project(name));

const deleteProject = (id) => {
    projects.splice(projects.findIndex(project => project.id === id), 1);
}

const findProject = (id) => {
    return projects.find(project => project.id === id);
}

const toggleProject = (id) => {
    // If every project is currently open when this function is run, then that means
    // an individual project is being opened. Therefore, every project must be closed
    // before opening the target project.
    if(allProjectsOpen) {
        projects.forEach(project => project.toggleOpenStatus("closed"));
        allProjectsOpen = false;
    }

    findProject(id).toggleOpenStatus();
}

// openStatus can be used to strictly toggle all projects either open or closed. 
// If this parameter is omitted, the projects will either be opened or closed
// depending on whether or not every project is open
const toggleAllProjects = (openStatus) => {
    if(openStatus) {
        projects.forEach(project => {
            project.toggleOpenStatus(openStatus);
        });

        allProjectsOpen = openStatus === "open" ? true : false;

    } else {
        projects.forEach(project => {
            project.toggleOpenStatus(allProjectsOpen ? "closed" : "open");
        });

        allProjectsOpen = !allProjectsOpen;
    }
}

// The output of this function will be read by the sidebar controller and used for
// creating project tabs
const getAllProjects = () => {
    return projects;
}

// The output of this function will be read by the main content controller
// and used for displaying projects.
const getOpenProjects = () => {
    return projects.filter(project => project.isOpen);
}

const atMaxProjects = () => projects.length === 15;

export { saveProjects, loadProjects, addProject, deleteProject, findProject, toggleProject, 
         toggleAllProjects, getAllProjects, getOpenProjects, atMaxProjects };