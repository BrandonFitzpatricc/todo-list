import { format } from "date-fns";

import {
  createTaskDisplay,
  createInput,
  createElement,
  Attribute,
} from "./utilities/element-factory";

const displayExpandedTask = (project, task) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.textContent = "";
  mainContent.appendChild(createExpandedTaskDisplay(task));
};

function createExpandedTaskDisplay(task) {
  const expandedTaskDisplay = createElement(
    "div",
    "",
    new Attribute("class", "expanded-task"),
    new Attribute("data-id", task.id),
  );

  const backBtn = createElement(
    "button",
    "Back to projects",
    new Attribute("class", "back-btn"),
  );

  const taskHeading = createTaskDisplay(task, "heading task-heading");

  const taskInfo = createElement(
    "div",
    "",
    new Attribute("class", "task-info"),
  );

  const taskDate = createInput(
    "task-date",
    "date",
    format(task.date, "yyyy-MM-dd"),
  );

  const taskPriority = createElement(
    "select",
    "",
    new Attribute("class", `task-priority ${task.priority}`),
    new Attribute("disabled"),
  );

  const taskPriorityOptions = [
    createElement(
      "option",
      "Not Important",
      new Attribute("value", "not-important"),
    ),

    createElement(
      "option",
      "Semi Important",
      new Attribute("value", "semi-important"),
    ),

    createElement("option", "Important", new Attribute("value", "important")),
  ];

  taskPriorityOptions.forEach((option) => {
    if (option.value === task.priority) option.setAttribute("selected", true);
    taskPriority.appendChild(option);
  });

  taskInfo.append(taskDate, taskPriority);

  const taskDescription = createElement(
    "textarea",
    task.description,
    new Attribute("class", "task-description"),
    new Attribute("type", "text"),
    new Attribute("maxlength", 500),
    new Attribute("readonly"),
  );

  const confirmChangesBtn = createElement(
    "button",
    "Confirm changes",
    new Attribute("class", "confirm-changes-btn hidden"),
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
