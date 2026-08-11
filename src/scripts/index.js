import "../stylesheets/custom-reset.css";
import "../stylesheets/universal.css";
import "../stylesheets/sidebar.css";
import "../stylesheets/main-content-universal.css";
import "../stylesheets/project.css";
import "../stylesheets/expanded-task.css";
import "../stylesheets/new-task-dialog.css";

import { loadProjects, toggleAllProjects } from "./model/project-manager.js";
import { initializeSidebar } from "./controller/sidebar-controller.js";
import { initializeProjectView } from "./controller/project-view-controller.js";

loadProjects();
toggleAllProjects("open");
initializeSidebar();
initializeProjectView();
