import { Project } from "./project.js";

const projects = [];

const getProjects = () => projects;

const addProject = (name) => projects.push(new Project(name));

const deleteProject = (id) => {
    projects.splice(projects.findIndex(project => project.id === id), 1);
}

const findProject = (id) => {
    return projects.find(project => project.id === id);
}

export { getProjects, addProject, deleteProject, findProject };