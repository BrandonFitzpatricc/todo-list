import { Task } from "./task.js";
import { compareAsc } from "date-fns";

class Project {
    #id;
    #name;
    #tasks;
    #isOpen;

    constructor(name) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#tasks = [];
        this.#isOpen = true;
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

    set isOpen(value) {
        this.#isOpen = value;
    }

    toggleOpenStatus() {
        this.#isOpen = !this.#isOpen;
    }

    addTask(title, description, dueDate, priority) {
        this.#tasks.push(new Task(title, description, dueDate, priority));
    }

    deleteTask(id) {
        this.#tasks.splice(this.#tasks.findIndex(task => task.id === id), 1);
    }

    findTask(id) {
        this.#tasks.find(task => task.id === id);
    }

    sortTasks() {
        return this.#tasks.sort((task1, task2) => compareAsc(task1.dueDate, task2.dueDate));
    }
}

export { Project };
