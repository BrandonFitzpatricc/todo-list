import { createExpandedTaskDisplay } from "./element-factory";
import { displayOpenProjects } from "./project-display-controller";

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

// This event listener can't be attached immediately, because currentTaskDisplay
// is undefined until an expanded task is displayed
function attachEventListener() {
    currentTaskDisplay.addEventListener("click", (event) => {
        const selectedButton = event.target;

        const buttonHandler = {
            "back-btn": () => {
                displayOpenProjects();
            }
        }

        buttonHandler[selectedButton.className]();
    });
}

export { displayExpandedTask }