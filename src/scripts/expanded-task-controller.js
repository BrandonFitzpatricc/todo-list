import { createExpandedTaskDisplay } from "./element-factory";

let currentTask;
let currentTaskDisplay;

const displayExpandedTask = (task) => {
    currentTask = task;
    currentTaskDisplay = createExpandedTaskDisplay(currentTask);
    attachEventListener()

    const mainContent = document.querySelector("#main-content");
    mainContent.textContent = "";
    mainContent.appendChild(currentTaskDisplay);
}

export { displayExpandedTask }