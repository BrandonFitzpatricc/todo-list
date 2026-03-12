import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { projects, addProject } from "./project-manager.js";
import { displayOpenProjects } from "./screen-controller.js";

addProject("Project 1");
projects[0].addTask("Task 1", "Description", "Mar 07 2026", "important");
projects[0].addTask("Task 2", "Description", "Mar 08 2026", "semi-important");
projects[0].addTask("Task 3", "Description", "Mar 08 2026", "not-important");

addProject("Project 2");
projects[1].addTask("Task 1", "Description", "Mar 09 2026", "important");
projects[1].addTask("Task 2", "Description", "Mar 08 2026", "semi-important");
projects[1].addTask("Task 3", "Description", "Mar 08 2026", "not-important");

displayOpenProjects();
