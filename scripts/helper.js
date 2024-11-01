"use strict";

class Helper {
    constructor(speed, elements = []) {
        this.delay = parseInt(400 / speed); // Set delay based on speed
        this.elements = elements; // Array of elements to manipulate
    }

    // Mark a cell as "current" to highlight it during sorting
    markCurrent = async (index) => {
        this.elements[index].classList.add("current");
    }

    // Mark a cell as "min" to indicate a potential minimum or key comparison
    markSpecial = async (index) => {
        this.elements[index].classList.add("min");
    }

    // Unmark a cell to reset its style after comparisons or swaps
    unmark = async (index) => {
        this.elements[index].className = "cell";
    }
    
    // Pause the process for the specified delay duration
    pause = () => {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    // Compare values of two cells, returning true if the first is greater than the second
    compare = async (index1, index2) => {
        await this.pause();
        const value1 = Number(this.elements[index1].getAttribute("value"));
        const value2 = Number(this.elements[index2].getAttribute("value"));
        return value1 > value2;
    }

    // Swap values of two cells visually and in attribute
    swap = async (index1, index2) => {
        await this.pause();
        const value1 = this.elements[index1].getAttribute("value");
        const value2 = this.elements[index2].getAttribute("value");

        this.updateCell(index1, value2);
        this.updateCell(index2, value1);
    }

    // Helper method to update a cell's value and height
    updateCell = (index, newValue) => {
        this.elements[index].setAttribute("value", newValue);
        this.elements[index].style.height = ${3.8 * newValue}px;
    }
}