import { format } from "date-fns";

import {
  createTaskDisplay,
  createInput,
  createElement,
  createTextElement,
} from "./utilities/element-factory";

import { Attribute } from "./utilities/attribute";

const displayExpandedTask = (project, task) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.textContent = "";
  mainContent.appendChild(createExpandedTaskDisplay(task));
};

function createExpandedTaskDisplay(task) {
  const expandedTaskDisplay = createElement(
    "div",
    "expanded-task",
    new Attribute("data-id", task.id),
  );

  const backBtn = createTextElement("button", "back-btn", "Back to projects");

  const taskHeading = createTaskDisplay(task, "heading task-heading");

  const taskInfo = createElement("div", "task-info");

  const taskDate = createInput(
    "task-date",
    "date",
    format(task.date, "yyyy-MM-dd"),
  );

  const taskPriority = createElement(
    "select",
    `task-priority ${task.priority}`,
    new Attribute("disabled"),
  );

  const taskPriorityOptions = [
    createTextElement(
      "option",
      "",
      "Not Important",
      new Attribute("value", "not-important"),
    ),

    createTextElement(
      "option",
      "",
      "Semi Important",
      new Attribute("value", "semi-important"),
    ),

    createTextElement(
      "option",
      "",
      "Important",
      new Attribute("value", "important"),
    ),
  ];

  taskPriorityOptions.forEach((option) => {
    if (option.value === task.priority) option.setAttribute("selected", true);
    taskPriority.appendChild(option);
  });

  taskInfo.append(taskDate, taskPriority);

  const taskDescription = createTextElement(
    "textarea",
    "task-description",
    task.description,
    new Attribute("type", "text"),
    new Attribute("maxlength", 500),
    new Attribute("readonly"),
  );

  const confirmChangesBtn = createTextElement(
    "button",
    "confirm-changes-btn hidden",
    "Confirm changes",
  );

  expandedTaskDisplay.append(
    backBtn,
    taskHeading,
    createElement("hr", ""),
    taskInfo,
    createElement("hr", ""),
    taskDescription,
    confirmChangesBtn,
  );

  return expandedTaskDisplay;
}

export { displayExpandedTask };
