import { format } from "date-fns";

import { findProject } from "./project-manager.js";
import { displayOpenProjects } from "./main-content-controller.js";

const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskForm = document.querySelector("#new-task-form");
const taskNameInput = document.querySelector("#task-name");
const taskDescriptionInput = document.querySelector("#task-description");
const taskDateInput = document.querySelector("#task-date");
const taskPrioritySelector = document.querySelector("#task-priority");

let currentProjectDisplay;

const openNewTaskForm = (projectDisplay) => {
    currentProjectDisplay = projectDisplay;
    newTaskForm.reset();
    taskDateInput.defaultValue = format(new Date(), "yyyy-MM-dd");
    newTaskDialog.showModal();
};

taskPrioritySelector.addEventListener("change", () => {
    const selectorClassName = taskPrioritySelector.className;
    taskPrioritySelector.className = selectorClassName
        .substring(0, selectorClassName.lastIndexOf(" ")) + ` ${taskPrioritySelector.value}`
});

document.querySelector("#submit-task-btn").addEventListener("click", () => {
    findProject(currentProjectDisplay.dataset.id).addTask(
        taskNameInput.value,
        taskDescriptionInput.value,
        taskDateInput.value,
        taskPrioritySelector.value
    );

    newTaskDialog.close();
    displayOpenProjects();
});

document.querySelector("#close-form-btn").addEventListener("click", () => newTaskDialog.close());

export { openNewTaskForm };