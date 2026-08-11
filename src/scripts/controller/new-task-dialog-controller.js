import { format } from "date-fns";

import { displayOpenProjects } from "../view/project-view.js";

const dialog = document.querySelector("#new-task-dialog");
const form = dialog.querySelector("#new-task-form");
const taskNameInput = form.querySelector("#task-name");
const taskDescriptionInput = form.querySelector("#task-description");
const taskDateInput = form.querySelector("#task-date");
const taskPrioritySelector = form.querySelector("#task-priority");

let selectedProject;

const openNewTaskDialog = (project) => {
  selectedProject = project;
  resetFormControls();
  dialog.showModal();
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

  dialog.close();
  displayOpenProjects();
});

document
  .querySelector("#close-form-btn")
  .addEventListener("click", () => dialog.close());

function resetFormControls() {
  form.reset();

  // The selector contains a class that matches its current value. "not-important"
  // is both the default selector value and class when the form is first opened.
  const selectorClassName = taskPrioritySelector.className;
  taskPrioritySelector.className =
    selectorClassName.substring(0, selectorClassName.lastIndexOf(" ")) +
    " not-important";

  taskDateInput.defaultValue = format(new Date(), "yyyy-MM-dd");
}

export { openNewTaskDialog };