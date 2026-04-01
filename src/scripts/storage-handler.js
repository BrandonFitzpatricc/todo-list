import { saveProjects } from "./project-manager.js";

const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

const storagePopulated = () => {
    return localStorage.length > 0;
}

window.addEventListener("unload", () => saveProjects())

export { storageAvailable, storagePopulated };