import addTask from "../icons/add-task.svg";
import edit from "../icons/edit.svg"
import trashCan from "../icons/delete.svg";
import expandTask from "../icons/expand-task.svg";
import projectFolder from "../icons/project-folder.svg";

import { format } from "date-fns";

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

    const addTaskBtn = createIconBtn(addTask, "icon of a plus sign inside of a circle");

    const editProjectBtn = createIconBtn(edit, "icon of a pen");

    const deleteProjectBtn = createIconBtn(trashCan, "icon of a trash can");

    projectHeading.append(projectName, addTaskBtn, editProjectBtn, deleteProjectBtn);

    projectDisplay.append(projectHeading, createElement("hr", ""));

    // Tasks within a project display are grouped by date. A task group will be created
    // for each unique date within the tasks, and every task sharing that date will be 
    // added to the group.
    let date = new Date(), taskGroup;
    project.sortTasks().forEach(task => {
        if(task.date.toDateString() !== date.toDateString()) {
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
    const taskDisplay = createElement("div", "", new Attribute("class", "task"));

    const checkbox = createElement("input", "",
        new Attribute("class", task.priority),
        new Attribute("type", "checkbox")
    );

    const taskName = createElement("div", task.name, 
        new Attribute("class", "task-name")
    );

    const expandTaskBtn = createIconBtn(expandTask, "view and edit icon");

    const deleteTaskBtn = createIconBtn(trashCan, "icon of a trash can");

    taskDisplay.append(checkbox, taskName, expandTaskBtn, deleteTaskBtn);

    return taskDisplay;
}

function createProjectTab(project) {
    const tab = createIconBtn(projectFolder, "icon of a folder");
    tab.className = "tab project";
    tab.dataset.id = project.id;

    // The project name is created as an input rather than a div to allow it to be editable.
    const projectName = createElement("input", "", 
        new Attribute("class", "name project-name"),
        new Attribute("type", "text"),
        new Attribute("value", project.name),
        new Attribute("maxlength", "24"),
        new Attribute("readonly")
    );

    tab.appendChild(projectName);

    return tab;
}

function createIconBtn(filePath, altText) {
    const btn = createElement("button", "");

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