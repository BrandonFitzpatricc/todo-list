import { createProjectTab } from "./element-factory.js";

import { displayOpenProjects } from "./main-content-controller.js";

import { addProject, toggleProject, toggleAllProjects, getAllProjects } from "./project-manager.js";

const tabContainer = document.querySelector("#tabs");

const displayProjectTabs = () => {
    tabContainer.querySelectorAll(".project").forEach(projectTab => {
        tabContainer.removeChild(projectTab)
    });

    getAllProjects().forEach(project => {
        tabContainer.insertBefore(
            createProjectTab(project, true), 
            document.querySelector("#new-project")
        );
    });
}

tabContainer.addEventListener("click", (event) => {
    const tab = event.target;

    if(tab.id === "new-project") {
        createNewProject();
    } else {
        selectProjectTab();
    }
});

function createNewProject() {
    // newProjectTab is a dummy tab that does not contain any project information.
    // It simply provides a clean interface for users to enter the name of a new project
    // and facilitate the creation of that project.
    const newProjectTab = createProjectTab(null, false);
    tabContainer.insertBefore(newProjectTab, document.querySelector("#new-project"));

    const projectNameInput = newProjectTab.querySelector(".project-name");
    projectNameInput.focus();
    ["blur", "keydown"].forEach(eventType => {
        projectNameInput.addEventListener(eventType, submitProjectName);
    });

    function submitProjectName(event) {
        if(event.type === "blur" || event.key === "Enter") {
            addProject(projectNameInput.value);
            // Submitting the project name through the enter key will fire a blur event.
            // Therefore, this event listener is removed after submission to ensure that
            // this callback function does not run twice.
            projectNameInput.removeEventListener("blur", submitProjectName);
            displayProjectTabs();
        }
    }
}

function selectProjectTab(tab) {
    if(tab.id === "my-projects") {
        toggleAllProjects();

        tabContainer.querySelectorAll(".tab.project").forEach(projectTab => {
            toggleTabSelection(projectTab, "off");
        });
        
    } else {
        toggleTabSelection(document.querySelector("#my-projects"), "off");
        toggleProject(tab.dataset.id);
    }

    toggleTabSelection(tab);
    displayOpenProjects();

}

// Tabs that are turned on have the "selected" class applied to them, which highlights the tab.
// selectionStatus can be used to strictly toggle the tab either on or off. If this parameter
// is omitted, the tab's selection status will be switched to either open or closed.
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