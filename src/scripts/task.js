import { parseISO } from "date-fns";

class Task {
  #id;
  #name;
  #description;
  #date;
  #priority;
  #isComplete;

  constructor(name, description, date, priority, isComplete) {
    this.#id = crypto.randomUUID();
    this.#name = name.trim() ? name : "Task";
    this.#description = description.trim() ? description : "No Description";
    this.#date = parseISO(date);
    this.#priority = priority;
    this.#isComplete = isComplete;
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
    return this.#isComplete;
  }

  edit(name, description, date, priority) {
    this.#name = name;
    this.#description = description;
    this.#date = parseISO(date);
    this.#priority = priority;
  }

  toggleCompletion() {
    this.#isComplete = !this.#isComplete;
  }

  // Used for saving tasks - this stringified object contains all of the information
  // needed to reconstruct a task object using its constructor
  toJSON() {
    return JSON.stringify({
      name: this.#name,
      description: this.#description,
      date: this.#date,
      priority: this.#priority,
      isComplete: this.#isComplete,
    });
  }
}

export { Task };
