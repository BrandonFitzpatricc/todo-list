import { Task } from "./task.js";

class Project {
    #id;
    #name;
    #tasks;

    constructor(name) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#tasks = [];
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

    get tasks() {
        return this.#tasks;
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
}

export { Project };