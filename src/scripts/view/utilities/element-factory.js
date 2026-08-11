import editIcon from "../../../icons/edit.svg";
import trashCanIcon from "../../../icons/delete.svg";
import expandTaskIcon from "../../../icons/expand-task.svg";

import { Attribute } from "./attribute";

const createTaskDisplay = (task, className) => {
  const taskDisplay = createElement(
    "div",
    className,
    new Attribute("data-id", task.id),
  );

  const checkbox = createInput(`task-checkbox ${task.priority}`, "checkbox");
  checkbox.checked = task.isComplete;

  // The task name is created as an input rather than a div to allow it to be editable.
  const taskName = createInput("name task-name", "text", task.name, "25");

  // The class name/functionality of this button will vary depending on whether or not
  // this task display is being used within a project, or as the header of an expanded task.
  const modifyTaskBtn = createIconBtn(
    className === "task" ? expandTaskIcon : editIcon,
    className === "task" ? "view and edit icon" : "icon of a pen",
    className === "task" ? "expand-task-btn" : "edit-task-btn",
  );

  const deleteTaskBtn = createIconBtn(
    trashCanIcon,
    "icon of a trash can",
    "delete-task-btn",
  );

  taskDisplay.append(checkbox, taskName, modifyTaskBtn, deleteTaskBtn);

  return taskDisplay;
};

const createInput = (className, type, value, maxlength) => {
  return createElement(
    "input",
    className,
    new Attribute("type", type),
    new Attribute("value", value ? value : ""),
    new Attribute("maxlength", maxlength ? maxlength : undefined),
    new Attribute("readonly"),
  );
};

const createIconBtn = (filePath, altText, className) => {
  const btn = createElement("button", className);

  const icon = createElement(
    "img",
    "icon",
    new Attribute("src", filePath),
    new Attribute("alt", altText),
    new Attribute("width", "40"),
    new Attribute("height", "40"),
  );

  btn.appendChild(icon);

  return btn;
};

const createElement = (type, className, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createTextElement = (type, className, textContent, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

export {
  createTaskDisplay,
  createIconBtn,
  createInput,
  createElement,
  createTextElement,
};
