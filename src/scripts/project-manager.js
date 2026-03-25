import { Project } from "./project.js";

let allProjectsOpen = true;

const projects = [];

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
    projects.forEach(project => {
        if(openStatus) {
            project.toggleOpenStatus(openStatus);
        } else {
            project.toggleOpenStatus(allProjectsOpen ? "closed" : "open");
        }
    });

    allProjectsOpen = !allProjectsOpen;
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

export { projects, addProject, deleteProject, findProject, toggleProject, 
         toggleAllProjects, getAllProjects, getOpenProjects, atMaxProjects };