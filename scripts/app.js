"use strict";

// Starts sorting based on the selected algorithm and speed
const start = async () => {
  document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden"; // Hide the footer initially
  const startTime = new Date();
  const algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value) || 1;

  if (algoValue === 0) {
    alert("Please select an algorithm.");
    return;
  }

  const algorithm = new sortAlgorithms(speedValue);
  try {
    // Execute the chosen sorting algorithm
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
      default:
        alert("Invalid Algorithm Selection");
    }
  } catch (error) {
    console.error("Error during sorting: ", error);
  }

  const endTime = new Date();
  document.getElementById("Ttime").innerHTML = ((endTime - startTime) / 1000).toFixed(2); // Display total execution time
};

// Render array on screen based on selected array size or user input
const RenderScreen = async () => {
  await RenderList();
};

// Render array list from either random values or user input
const RenderList = async () => {
  const sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();
  const list = await generateArray(sizeValue);
  const arrayContainer = document.querySelector(".array");

  // Create visual representation of the array
  list.forEach((element) => {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = ${3.8 * element}px; // Adjust height for visualization
    arrayContainer.appendChild(node);
  });
};

// Generate an array either from user input or random values
const generateArray = async (length) => {
  const inputMode = String(document.querySelector(".input").value);
  const lowerBound = 1;
  const upperBound = 100;
  let list = [];

  if (inputMode === "Y") {
    const inputBox = document.querySelector(".inputBox");
    const inputValues = inputBox.value.split(",").map(Number);

    if (inputValues.some(isNaN)) {
      alert("Please enter valid numbers separated by commas.");
      return [];
    }
    
    list = inputValues; // Use user-provided values
  } else {
    // Generate random numbers if user input is not selected
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
      list.push(randomNumber);
    }
  }
  
  return list;
};

// Clear existing array from the screen
const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

// Handle responsive navbar
const toggleNavbar = () => {
  const Navbar = document.querySelector(".navbar");
  Navbar.classList.toggle("responsive");
};


