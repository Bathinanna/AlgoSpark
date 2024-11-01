"use strict";

const start = async () => {
    document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden";
    let now = new Date();
    let algoValue = Number(document.querySelector(".algo-menu").value);
    let speedValue = Number(document.querySelector(".speed-menu").value);

    if (speedValue === 0) {
        speedValue = 1;
    }
    if (algoValue === 0) {
        alert("No Algorithm Selected");
        return;
    }

    let algorithm = new sortAlgorithms(speedValue);
    switch (algoValue) {
        case 1:
            await algorithm.BubbleSort();
            break;
        case 2:
            await algorithm.SelectionSort();
            break;
        case 3:
            await algorithm.InsertionSort();
            break;
        case 4:
            await algorithm.MergeSort();
            break;
        case 5:
            await algorithm.QuickSort();
            break;
    }
    let now1 = new Date();
    document.getElementById('Ttime').innerHTML = ((now1 - now) / 1000).toFixed(2);
};

const RenderScreen = async () => {
    await RenderList();
};

const RenderInput = async () => {
    let input = String(document.querySelector(".inputBox").value);
    console.log("Input in app.js is", input);
    await RenderList(input);
};

const RenderList = async (input = null) => {
    let sizeValue = Number(document.querySelector(".size-menu").value);
    await clearScreen();

    let list = await randomList(sizeValue, input);
    const arrayNode = document.querySelector(".array");
    console.log("Array Node in app.js is", arrayNode);
    console.log("List in app.js is", list);
    for (const element of list) {
        const node = document.createElement("div");
        node.className = "cell";
        node.setAttribute("value", String(element));
        node.style.height = `${3.8 * element}px`;
        arrayNode.appendChild(node);
    }
};

const randomList = async (length, input) => {
    let list = [];
    const lowerBound = 1;
    const upperBound = 100;

    if (input) {
        list = input.split(',').map(num => {
            return Math.min(Math.max(parseInt(num.trim()), lowerBound), upperBound); // Clamping values
        });
        length = list.length; // Update length based on user input
    } else {
        for (let counter = 0; counter < length; ++counter) {
            let randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
            list.push(randomNumber);
        }
    }
    
    return list;
};

const clearScreen = async () => {
    document.querySelector(".array").innerHTML = "";
};

const response = () => {
    let Navbar = document.querySelector(".navbar");
    Navbar.classList.toggle("responsive");
};

// Event Listeners
document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderList);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
document.querySelector(".inputBox").addEventListener("change", RenderInput);
window.onload = RenderScreen;
