import { Task } from "./task.js";
import { compareAsc } from "date-fns";

class Project {
    #id;
    #name;
    #tasks;
    #isOpen;

    constructor(name) {
        this.#id = crypto.randomUUID();
        this.#name = name.trim() ? name : "New Project";
        this.#tasks = [];
        // Any project with isOpen set to true will be displayed.
        this.#isOpen = false;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get isOpen() {
        return this.#isOpen;
    }

    // openStatus can be used to strictly toggle the project either open or closed. 
    // If this parameter is omitted, the project's current open status will be 
    // switched to either open or closed.
    toggleOpenStatus(openStatus) {
        if(openStatus) this.#isOpen = openStatus === "open" ? true : false;
        else this.#isOpen = !this.#isOpen;
    }

    addTask(name, description, date, priority) {
        this.#tasks.push(new Task(name, description, date, priority));
    }

    deleteTask(id) {
        this.#tasks.splice(this.#tasks.findIndex(task => task.id === id), 1);
    }

    findTask(id) {
        this.#tasks.find(task => task.id === id);
    }

    // Tasks are sorted by date before being displayed so that they can be
    // grouped by these dates. Each date group is displayed in order.
    sortTasks() {
        return this.#tasks.sort((task1, task2) => compareAsc(task1.date, task2.date));
    }
}

export { Project };
