import "../stylesheets/custom-reset.css";
import "../stylesheets/universal.css";
import "../stylesheets/sidebar.css";
import "../stylesheets/main-content-universal.css";
import "../stylesheets/project.css";
import "../stylesheets/expanded-task.css";
import "../stylesheets/new-task-dialog.css";

import { loadProjects, toggleAllProjects } from "./project-manager.js";
import { displayOpenProjects } from "./project-display-controller.js";
import { displayProjectTabs } from "./sidebar-controller.js";

loadProjects();
toggleAllProjects("open");
displayProjectTabs();
displayOpenProjects();
