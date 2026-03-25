class Task {
    #id;
    #name;
    #description;
    #date;
    #priority;
    #isComplete;

    constructor(name, description, date, priority) {
        this.#id = crypto.randomUUID();
        this.#name = name.trim() ? name : "Task";
        this.#description = description.trim() ? description: "No Description";
        this.#date = new Date(date);
        this.#priority = priority;
        this.#isComplete = false;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get date() {
        return this.#date;
    }

    get priority() {
        return this.#priority;
    }

    get isComplete() {
        return this.isComplete;
    }

    edit(name, description, date, priority) {
        this.#name = name.trim() ? name : "Task";
        this.#description = description.trim() ? description: "No Description";
        this.#date = date;
        this.#priority = priority;
    }

    toggleCompletion() {
        this.#isComplete = !this.#isComplete;
    }
}

export { Task };