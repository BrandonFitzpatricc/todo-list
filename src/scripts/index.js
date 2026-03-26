import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { projects, addProject } from "./project-manager.js";
import { displayOpenProjects } from "./main-content-controller.js";
import { displayProjectTabs } from "./sidebar-controller.js";

addProject("Project 1");
projects[0].addTask("Task 1", "Description", "2026-03-07", "important");
projects[0].addTask("Task 2", "Description", "2026-03-08", "semi-important");
projects[0].addTask("Task 3", "Description", "2026-03-08", "not-important");

addProject("Project 2");
projects[1].addTask("Task 1", "Description", "2026-03-09", "important");
projects[1].addTask("Task 2", "Description", "2026-03-08", "semi-important");
projects[1].addTask("Task 3", "Description", "2026-03-08", "not-important");

displayProjectTabs();
// displayOpenProjects();