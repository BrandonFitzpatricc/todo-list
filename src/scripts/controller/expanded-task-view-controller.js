import { displayOpenProjects } from "../view/project-view";
import { displayExpandedTask } from "../view/expanded-task-view";

let currentProject;
let currentTask;
let currentTaskDisplay;

const initializeExpandedTask = (project, task) => {
  displayExpandedTask(task);

  currentProject = project;
  currentTask = task;
  currentTaskDisplay = document.querySelector(".expanded-task");
  attachTaskEventListener();
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

        enableInputs(inputs);
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

function enableInputs(inputs) {
  toggleInputs(inputs, "enabled");
}

function disableInputs(inputs) {
  toggleInputs(inputs, "disabled");
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
    taskPrioritySelector.className = `task-priority ${taskPrioritySelector.value}`;

    const taskCheckbox = currentTaskDisplay.querySelector(".task-checkbox");
    taskCheckbox.className = `task-checkbox ${taskPrioritySelector.value}`;
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }
}

function enableConfirmBtn(inputs) {
  const confirmBtn = currentTaskDisplay.querySelector(".confirm-changes-btn");
  confirmBtn.className = confirmBtn.className.replace("hidden", "");

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
    disableInputs(inputs);

    confirmBtn.className = confirmBtn.className + " hidden";
    confirmBtn.removeEventListener("click", submitChanges);

    // This prevents the currentTaskDisplay event listener callback function from
    // running each time the confirm button is clicked, which would break the code.
    event.stopPropagation();
  });
}

export { initializeExpandedTask };
