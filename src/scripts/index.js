import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { loadProjects, toggleAllProjects } from "./project-manager.js";
import { displayOpenProjects } from "./project-display-controller.js";
import { displayProjectTabs } from "./sidebar-controller.js";

loadProjects();
toggleAllProjects("open");
displayProjectTabs();
displayOpenProjects();
