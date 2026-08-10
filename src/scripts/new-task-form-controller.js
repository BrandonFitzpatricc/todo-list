import { format } from "date-fns";

import { displayOpenProjects } from "./project-display-controller.js";

const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskForm = document.querySelector("#new-task-form");
const taskNameInput = document.querySelector("#task-name");
const taskDescriptionInput = document.querySelector("#task-description");
const taskDateInput = document.querySelector("#task-date");
const taskPrioritySelector = document.querySelector("#task-priority");

let selectedProject;

const openNewTaskForm = (project) => {
  selectedProject = project;
  resetFormControls();
  newTaskDialog.showModal();
};

// The selector contains a class that matches its current value. This class changes the color
// of the selector depending on the value selected.
taskPrioritySelector.addEventListener("change", () => {
  const selectorClassName = taskPrioritySelector.className;
  taskPrioritySelector.className =
    selectorClassName.substring(0, selectorClassName.lastIndexOf(" ")) +
    ` ${taskPrioritySelector.value}`;
});

document.querySelector("#submit-task-btn").addEventListener("click", () => {
  selectedProject.addTask(
    taskNameInput.value,
    taskDescriptionInput.value,
    taskDateInput.value,
    taskPrioritySelector.value,
  );

  newTaskDialog.close();
  displayOpenProjects();
});

document
  .querySelector("#close-form-btn")
  .addEventListener("click", () => newTaskDialog.close());

function resetFormControls() {
  newTaskForm.reset();

  // The selector contains a class that matches its current value. "not-important"
  // is both the default selector value and class when the form is first opened.
  const selectorClassName = taskPrioritySelector.className;
  taskPrioritySelector.className =
    selectorClassName.substring(0, selectorClassName.lastIndexOf(" ")) +
    " not-important";

  taskDateInput.defaultValue = format(new Date(), "yyyy-MM-dd");
}

export { openNewTaskForm };
