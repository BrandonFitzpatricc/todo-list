import { createExpandedTaskDisplay } from "./element-factory";
import { displayOpenProjects } from "./project-display-controller";

let currentProject;
let currentTask;
let currentTaskDisplay;

const displayExpandedTask = (project, task) => {
  currentProject = project;
  currentTask = task;
  currentTaskDisplay = createExpandedTaskDisplay(currentTask);
  attachTaskEventListener();

  const mainContent = document.querySelector("#main-content");
  mainContent.textContent = "";
  mainContent.appendChild(currentTaskDisplay);
};

// This event listener can't be attached immediately, because currentTaskDisplay
// is undefined until an expanded task is displayed
function attachTaskEventListener() {
  currentTaskDisplay.addEventListener("click", (event) => {
    const selectedButton = event.target;

    const buttonHandler = {
      "back-btn": () => {
        displayOpenProjects();
      },

      "edit-task-btn": () => {
        const inputs = currentTaskDisplay.querySelectorAll(
          "input:not([type='checkbox']), select, textarea",
        );

        toggleInputs(inputs, "enabled");
        enableConfirmBtn(inputs);
      },

      "delete-task-btn": () => {
        currentProject.deleteTask(currentTask.id);
        displayOpenProjects();
      },

      "task-checkbox": () => {
        const taskDisplay = selectedButton.parentNode;
        currentProject.findTask(taskDisplay.dataset.id).toggleCompletion();
      },
    };

    // The first class name of each button will correspond to
    // one of the button handler properties.
    buttonHandler[selectedButton.className.split(" ")[0]]();
  });
}

// Inputs can be manually toggled to either enabled or disabled using the toggleStatus parameter.
function toggleInputs(inputs, toggleStatus) {
  inputs.forEach((input) => {
    if (input.type === "select-one") {
      input.disabled = toggleStatus === "enabled" ? false : true;

      if (toggleStatus === "enabled") {
        input.addEventListener("change", changePriorityColor);
      } else {
        input.removeEventListener("change", changePriorityColor);
      }
    } else {
      input.readOnly = toggleStatus === "enabled" ? false : true;
    }

    if (toggleStatus === "enabled") {
      // This prevents the currentTaskDisplay event listener callback function
      // from running each time an input is clicked on to be edited, which would
      // break the code.
      input.addEventListener("click", stopPropagation);
    } else {
      input.removeEventListener("click", stopPropagation);
    }
  });

  // The selector and task checkbox each contain a class that matches the
  // current priority value. This class changes the color of each element
  // depending on that value.
  function changePriorityColor(event) {
    const taskPrioritySelector = event.target;

    const selectorClassName = taskPrioritySelector.className;
    taskPrioritySelector.className =
      selectorClassName.substring(0, selectorClassName.lastIndexOf(" ")) +
      ` ${taskPrioritySelector.value}`;

    const taskCheckbox = currentTaskDisplay.querySelector(".task-checkbox");
    taskCheckbox.className =
      taskCheckbox.className.substring(
        0,
        taskCheckbox.className.lastIndexOf(" "),
      ) + ` ${taskPrioritySelector.value}`;
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }
}

function enableConfirmBtn(inputs) {
  // Toggles visibility of the confirm changes button by removing the
  // "hidden" class from it.
  const confirmBtn = currentTaskDisplay.querySelector(".confirm-changes-btn");
  confirmBtn.className = confirmBtn.className.substring(
    0,
    confirmBtn.className.lastIndexOf(" "),
  );

  confirmBtn.addEventListener("click", function submitChanges(event) {
    const [
      taskNameInput,
      taskDateInput,
      taskPrioritySelector,
      taskDescriptionInput,
    ] = inputs;

    taskNameInput.value = taskNameInput.value.trim()
      ? taskNameInput.value
      : "Task";
    taskDescriptionInput.value = taskDescriptionInput.value.trim()
      ? taskDescriptionInput.value
      : "No Description";

    currentTask.edit(
      taskNameInput.value,
      taskDescriptionInput.value,
      taskDateInput.value,
      taskPrioritySelector.value,
    );

    // Note: each event listener that was added during the task editing process should be
    // removed once the changes have been submitted, as these event listeners only serve a
    // purpose while the user is editing a task.
    toggleInputs(inputs, "disabled");

    confirmBtn.className = confirmBtn.className + " hidden";
    confirmBtn.removeEventListener("click", submitChanges);

    // This prevents the currentTaskDisplay event listener callback function from
    // running each time the confirm button is clicked, which would break the code.
    event.stopPropagation();
  });
}

export { displayExpandedTask };
