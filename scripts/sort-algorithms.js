"use strict";

class SortingVisualizer {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
        this.originalValues = Array.from(this.list).map(cell => ({
            value: Number(cell.getAttribute("value")),
            cell: cell
        }));
    }

    resetList() {
        this.list.forEach((cell, index) => {
            cell.setAttribute("value", this.originalValues[index].value);
            cell.style.height = `${3.5 * this.originalValues[index].value}px`;
            cell.setAttribute("class", "cell");
        });
    }

    async markCells(indices) {
        for (let index of indices) {
            await this.help.mark(index);
        }
        await this.help.pause(); // Optional pause after marking
        for (let index of indices) {
            await this.help.unmark(index);
        }
    }

    // BUBBLE SORT
    async BubbleSort() {
        for (let i = 0; i < this.size - 1; ++i) {
            for (let j = 0; j < this.size - i - 1; ++j) {
                await this.markCells([j, j + 1]);
                if (await this.help.compare(j, j + 1)) {
                    await this.help.swap(j, j + 1);
                }
                await this.markCells([j, j + 1]);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
        this.displayComplexity("O(n^2)");
    }

    // INSERTION SORT
    async InsertionSort() {
        for (let i = 1; i < this.size; ++i) {
            let j = i;
            while (j > 0 && await this.help.compare(j, j - 1)) {
                await this.markCells([j, j - 1]);
                await this.help.swap(j, j - 1);
                await this.markCells([j, j - 1]);
                j -= 1;
            }
        }
        this.finalizeSort();
    }

    // SELECTION SORT
    async SelectionSort() {
        for (let i = 0; i < this.size; ++i) {
            let minIndex = i;
            for (let j = i + 1; j < this.size; ++j) {
                await this.markCells([minIndex, j]);
                if (await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.markCells([j]);
            }
            await this.markCells([minIndex, i]);
            await this.help.swap(minIndex, i);
            this.list[i].setAttribute("class", "cell done");
        }
        this.finalizeSort();
    }

    // MERGE SORT
    async MergeSort() {
        await this.MergeDivider(0, this.size - 1);
        this.finalizeSort();
    }

    async MergeDivider(start, end) {
        if (start < end) {
            let mid = Math.floor((start + end) / 2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid + 1, end);
            await this.Merge(start, mid, end);
        }
    }

    async Merge(start, mid, end) {
        let newList = [];
        let leftIndex = start;
        let rightIndex = mid + 1;

        while (leftIndex <= mid && rightIndex <= end) {
            let leftValue = Number(this.list[leftIndex].getAttribute("value"));
            let rightValue = Number(this.list[rightIndex].getAttribute("value"));
            if (leftValue <= rightValue) {
                newList.push(leftValue);
                leftIndex++;
            } else {
                newList.push(rightValue);
                rightIndex++;
            }
        }

        while (leftIndex <= mid) {
            newList.push(Number(this.list[leftIndex].getAttribute("value")));
            leftIndex++;
        }
        while (rightIndex <= end) {
            newList.push(Number(this.list[rightIndex].getAttribute("value")));
            rightIndex++;
        }

        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }

        for (let c = start; c <= end; ++c) {
            await this.help.pause();
            this.list[c].setAttribute("value", newList[c - start]);
            this.list[c].style.height = `${3.5 * newList[c - start]}px`;
        }

        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    async QuickSort() {
        await this.QuickDivider(0, this.size - 1);
        this.finalizeSort();
    }

    async QuickDivider(start, end) {
        if (start < end) {
            let pivotIndex = await this.Partition(start, end);
            await this.QuickDivider(start, pivotIndex - 1);
            await this.QuickDivider(pivotIndex + 1, end);
        }
    }

    async Partition(start, end) {
        let pivot = Number(this.list[end].getAttribute("value"));
        let partitionIndex = start;

        await this.help.markSpl(end);
        for (let c = start; c < end; ++c) {
            await this.help.mark(c);
            let currValue = Number(this.list[c].getAttribute("value"));
            if (currValue < pivot) {
                await this.help.swap(c, partitionIndex);
                partitionIndex++;
            }
            await this.help.unmark(c);
        }
        await this.help.swap(partitionIndex, end);
        await this.help.unmark(end);
        return partitionIndex;
    }

    finalizeSort() {
        for (let counter = 0; counter < this.size; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
        this.displayComplexity("O(n^2) or O(nlog(n)) depending on the sort");
    }

    displayComplexity(complexity) {
        document.getElementById('time').innerHTML = complexity;
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
    }

    setSpeed(speed) {
        this.help.setDelay(speed);
    }
}
