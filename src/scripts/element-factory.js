function createElement(elementType, textContent, ...attributes) {
    const newElement = document.createElement(elementType);
    newElement.innerHTML = textContent;
    attributes.forEach(attribute => newElement.setAttribute(attribute.name, attribute.value));
    return newElement;
}

class Attribute {
    #name;
    #value;

    constructor(name, value) {
        this.#name = name;
        this.#value = value;
    }

    get name() {
        return this.#name;
    }

    get value() {
        return this.#value;
    }
}

export{ createElement, Attribute };