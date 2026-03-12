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
        projects.forEach(project => project.toggleOpenStatus());
        allProjectsOpen = false;
    }

    findProject(id).toggleOpenStatus();
}

const openAllProjects = () => {
    if(!allProjectsOpen) {
        projects.forEach(project => project.isOpen = true);
        allProjectsOpen = true;
    }
}

const getOpenProjects = () => {
    return projects.filter(project => project.isOpen);
}

const maxProjects = () => projects.length > 15;

export { projects, addProject, deleteProject, findProject, toggleProject, openAllProjects, getOpenProjects, maxProjects };