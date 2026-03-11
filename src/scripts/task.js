class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #isComplete;

    constructor(title, description, dueDate, priority) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate);
        this.#priority = priority;
        this.#isComplete = false;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get isComplete() {
        return this.isComplete;
    }

    edit(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }

    toggleCompletion() {
        this.#isComplete = !this.#isComplete;
    }
}

export { Task };