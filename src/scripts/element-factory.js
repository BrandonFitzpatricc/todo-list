import { format } from "date-fns";

import addTaskIcon from "../icons/add-task.svg";
import editIcon from "../icons/edit.svg"
import trashCanIcon from "../icons/delete.svg";
import expandTaskIcon from "../icons/expand-task.svg";
import projectFolderIcon from "../icons/project-folder.svg";

function createProjectDisplay(project) {
    const projectDisplay = createElement("div", "", 
        new Attribute("class", "project"),
        new Attribute("data-id", project.id)
    );

    const projectHeading = createElement("div", "", 
        new Attribute("class", "heading project-heading")
    );

    // The project name is created as an input rather than a div to allow it to be editable.
    const projectName = createElement("input", "", 
        new Attribute("class", "name project-name"),
        new Attribute("type", "text"),
        new Attribute("value", project.name),
        new Attribute("maxlength", "24"),
        new Attribute("readonly")
    );

    const addTaskBtn = createIconBtn(addTaskIcon, 
        "icon of a plus sign inside of a circle",
        "add-task-btn"
    );

    const editProjectBtn = createIconBtn(editIcon, 
        "icon of a pen",
        "edit-project-btn"
    );

    const deleteProjectBtn = createIconBtn(trashCanIcon, 
        "icon of a trash can",
        "delete-project-btn"
    );

    projectHeading.append(projectName, addTaskBtn, editProjectBtn, deleteProjectBtn);

    projectDisplay.append(projectHeading, createElement("hr", ""));

    // Tasks within a project display are grouped by date. A task group will be created
    // for each unique date within the tasks, and every task sharing that date will be 
    // added to the group.
    let date = new Date(undefined);
    let taskGroup;

    project.sortTasks().forEach(task => {
        const isNewDate = task.date.toDateString() !== date.toDateString()
        if(isNewDate) {
            date = task.date;

            taskGroup = createElement("div", "", new Attribute("class", "task-group"));
            projectDisplay.appendChild(taskGroup);

            const taskGroupHeading = createElement("div", format(date, "MMMM dd yyyy"),
                new Attribute("class", "group-date"));
                
            taskGroup.append(taskGroupHeading, createElement("hr", ""));
        }

        taskGroup.append(createTaskDisplay(task), createElement("hr", ""));
    });

    return projectDisplay;
}

function createTaskDisplay(task) {
    const taskDisplay = createElement("div", "", 
        new Attribute("class", "task"),
        new Attribute("data-id", task.id)
    );

    const checkbox = createElement("input", "",
        new Attribute("class", task.priority),
        new Attribute("type", "checkbox")
    );

    const taskName = createElement("div", task.name, 
        new Attribute("class", "task-name")
    );

    const expandTaskBtn = createIconBtn(expandTaskIcon, "view and edit icon", "expand-task-btn");

    const deleteTaskBtn = createIconBtn(trashCanIcon, "icon of a trash can", "delete-task-btn");

    taskDisplay.append(checkbox, taskName, expandTaskBtn, deleteTaskBtn);

    return taskDisplay;
}

// Note: project tabs can be created without passing in a project object. The purpose
// of these tabs is to provide a clean interface for users to enter a project name.
function createProjectTab(project) {
    const tab = createIconBtn(projectFolderIcon, "icon of a folder", "tab project");
    tab.dataset.id = project ? project.id : "";

    // The project name is created as an input rather than a div to allow it to be editable.
    const projectName = createElement("input", "", 
        new Attribute("class", "name project-name"),
        new Attribute("type", "text"),
        new Attribute("value", project ? project.name: ""),
        new Attribute("maxlength", "24"),
        new Attribute("readonly")
    );

    if(!project) {
        projectName.readOnly = false;
        tab.disabled = true;
    }

    tab.appendChild(projectName);

    return tab;
}

function createIconBtn(filePath, altText, className) {
    const btn = createElement("button", "",
        new Attribute("class", className)
    );

    const icon = createElement("img", "",
        new Attribute("class", "icon"), 
        new Attribute("src", filePath),
        new Attribute("alt", altText),
        new Attribute("width", "40"),
        new Attribute("height", "40")
    );

    btn.appendChild(icon);

    return btn;
}

function createElement(elementType, textContent, ...attributes) {
    const newElement = document.createElement(elementType);
    newElement.innerHTML = textContent;
    attributes.forEach(attribute => newElement.setAttribute(attribute.name, attribute.value));
    return newElement;
}

class Attribute {
    #name;
    #value;

    constructor(name, value) {
        this.#name = name;
        this.#value = value;
    }

    get name() {
        return this.#name;
    }

    get value() {
        return this.#value;
    }
}

export{ createProjectDisplay, createProjectTab };