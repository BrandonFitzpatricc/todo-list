import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { getProjects, addProject, deleteProject, findProject } from "./project-manager.js";

addProject("Project");

const project = findProject(getProjects()[0].id);

project.addTask("Task", "Lorem Ipsum Dolor", "Mar 04 2026", "important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 04 2026", "semi-important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 03 2026", "not-important");

project.addTask("Task", "Lorem Ipsum Dolor", "Mar 03 2026", "important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 04 2026", "semi-important");
project.addTask("Task", "Lorem Ipsum Dolor", "Mar 03 2026", "not-important");

project.deleteTask(project.tasks[3].id);

console.log(project.sortTasks());

