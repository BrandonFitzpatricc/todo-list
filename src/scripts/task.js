import { parseISO } from "date-fns";

class Task {
    id;
    name;
    description;
    date;
    priority;
    isComplete

    constructor(name, description, date, priority) {
        this.id = crypto.randomUUID();
        this.name = name.trim() ? name : "Task";
        this.description = description.trim() ? description : "No Description";
        this.date = parseISO(date);
        this.priority = priority;
        this.isComplete = false;
    }

    edit(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = parseISO(date);
        this.priority = priority;
    }

    toggleCompletion() {
        this.isComplete = !this.isComplete;
    }
}

export { Task };