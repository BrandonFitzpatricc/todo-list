import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { projects, addProject, deleteProject, findProject, toggleProject, openAllProjects, getOpenProjects} from "./project-manager.js";

addProject("Project");
addProject("Project 2");
addProject("Project 3");

const project = findProject(projects[2].id);

project.addTask("Task", "Lorem Ipsum Dolor", "Mar 04 2026", "important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 04 2026", "semi-important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 03 2026", "not-important");

project.addTask("Task", "Lorem Ipsum Dolor", "Mar 03 2026", "important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 04 2026", "semi-important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 03 2026", "not-important");

toggleProject(projects[2].id);
toggleProject(projects[0].id);

toggleProject(projects[0].id);

openAllProjects();

console.log(getOpenProjects());