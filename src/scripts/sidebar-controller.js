import { createProjectTab } from "./element-factory.js";

import { displayOpenProjects } from "./main-content-controller.js";

import { toggleProject, toggleAllProjects, getAllProjects } from "./project-manager.js";

const tabContainer = document.querySelector("#tabs");

const displayProjectTabs = () => {
    getAllProjects().forEach(project => {
        tabContainer.insertBefore(createProjectTab(project, true), 
            document.querySelector("#new-project"));
    });
}

tabContainer.addEventListener("click", (event) => {
    const tab = event.target;

    if(tab.id === "my-projects") {
        toggleAllProjects();

        tabContainer.querySelectorAll(".tab.project").forEach(projectTab => {
            toggleTabSelection(projectTab, "off");
        });
    } else {
        toggleTabSelection(document.querySelector("#my-projects"), "off");
        toggleProject(event.target.dataset.id);
    }

    toggleTabSelection(tab);
    displayOpenProjects();
});

// Tabs that are turned on have the "selected" class applied to them, which highlights the tab.
// selectionStatus can be used to strictly toggle the tab either on or off. If this parameter
// is omitted, the tab will either be toggled on or off depending on its current status. 
function toggleTabSelection(tab, selectionStatus) {
    if(selectionStatus === "on" && tab.className.split(" ").at(-1) !== "selected") {
        tab.className = `${tab.className} selected`
        
    } else if (selectionStatus === "off" && tab.className.split(" ").at(-1) === "selected") {
        tab.className = 
            tab.className.substring(0, tab.className.lastIndexOf(" "));

    } else if(!selectionStatus) {
        tab.className = tab.className.split(" ").at(-1) === "selected" ? 
                tab.className.substring(0, tab.className.lastIndexOf(" ")) :
                `${tab.className} selected`;
    }
}

export { displayProjectTabs };