import { format } from "date-fns";

import addTaskIcon from "../../icons/add-task.svg";
import editIcon from "../../icons/edit.svg";
import trashCanIcon from "../../icons/delete.svg";

import {
  createTaskDisplay,
  createInput,
  createIconBtn,
  createElement,
  createTextElement,
} from "./utilities/element-factory.js";

import { Attribute } from "./utilities/attribute.js";

import { getOpenProjects } from "../model/project-manager.js";

const mainContent = document.querySelector("#main-content");

const displayOpenProjects = () => {
  mainContent.textContent = "";
  getOpenProjects().forEach((project) => {
    mainContent.appendChild(createProjectDisplay(project));
  });
};

const createProjectDisplay = (project) => {
  const projectDisplay = createElement(
    "div",
    "project",
    new Attribute("data-id", project.id),
  );

  const projectHeading = createElement("div", "heading project-heading");

  // The project name is created as an input rather than a div to allow it to be editable.
  const projectName = createInput(
    "name project-name",
    "text",
    project.name,
    "24",
  );

  const addTaskBtn = createIconBtn(
    addTaskIcon,
    "icon of a plus sign inside of a circle",
    "add-task-btn",
  );

  const editProjectBtn = createIconBtn(
    editIcon,
    "icon of a pen",
    "edit-project-btn",
  );

  const deleteProjectBtn = createIconBtn(
    trashCanIcon,
    "icon of a trash can",
    "delete-project-btn",
  );

  projectHeading.append(
    projectName,
    addTaskBtn,
    editProjectBtn,
    deleteProjectBtn,
  );

  projectDisplay.append(projectHeading, createElement("hr", ""));

  // Tasks within a project display are grouped by date. A task group will be created
  // for each unique date within the tasks, and every task sharing that date will be
  // added to the group.
  let date = new Date(undefined);
  let taskGroup;

  project.sortTasks().forEach((task) => {
    const isNewDate = task.date.toDateString() !== date.toDateString();
    if (isNewDate) {
      date = task.date;

      taskGroup = createElement("div", "task-group");

      projectDisplay.appendChild(taskGroup);

      const taskGroupHeading = createTextElement(
        "div",
        "group-date",
        format(date, "MMMM dd yyyy"),
      );

      taskGroup.append(taskGroupHeading, createElement("hr", ""));
    }

    taskGroup.append(createTaskDisplay(task, "task"), createElement("hr", ""));
  });

  return projectDisplay;
};

export { displayOpenProjects };
