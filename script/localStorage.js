/*
LocalStorage is a web storage feature of JavaScript that lets you persist data by storing the data as a key:value pair.
The HTML and CSS for this project have been provided for you. Take a look at the files to get yourself familiarized with them.
In earlier projects, you learned how to add and remove classes from an element with el.classList.add() and el.classList.remove(). Another method to use with the classList property is the toggle method.
The toggle method will add the class if it is not present on the element, and remove the class if it is present on the element.
Example Code
element.classList.toggle("class-to-toggle");
A modal is an element that prevents all interaction with elements outside it until the modal has been dismissed.
The HTML dialog element has a showModal() method that can be used to display a modal dialog box on a web page.
Example Code
dialogElement.showModal();
If the user clicks the Cancel button, you want to cancel the process and close the modal so the user can continue editing. The HTML dialog element has a close() method that can be used to close a modal dialog box on a web page.
Example Code
dialogElement.close();
The findIndex() array method finds and returns the index of the first element in an array that meets the criteria specified by a provided testing function. If no such element is found, the method returns -1.
Here's an example:
Example Code
const numbers = [3, 1, 5, 6];
const firstNumLargerThanThree = numbers.findIndex((num) => num > 3);
console.log(firstNumLargerThanThree); // prints index 2
When a user creates a task, it should be saved in an object.
Date.now() returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
unshift() is an array method that is used to add one or more elements to the beginning of an array.
Example Code
const arr = [1, 2, 3];
arr.unshift(0);
// [0, 1, 2, 3]
console.log(arr); 
splice() is an array method that modifies arrays by removing, replacing, or adding elements at a specified index, while also returning the removed elements. It can take up to three arguments: the first one is the mandatory index at which to start, the second is the number of items to remove, and the third is an optional replacement element. Here's an example:
Example Code
const fruits = ["mango", "date", "cherry", "banana", "apple"];
// Remove date and cherry from the array starting at index 1
const removedFruits = fruits.splice(1, 2);
console.log(fruits); // [ 'mango', 'banana', 'apple' ]
console.log(removedFruits); // [ 'date', 'cherry' ]
localStorage offers methods for saving, retrieving, and deleting items. The items you save can be of any JavaScript data type.

For instance, the setItem() method is used to save an item, and the getItem() method retrieves the item. To delete a specific item, you can utilize the removeItem() method, or if you want to delete all items in the storage, you can use clear().
Here's how you can save an item:
Example Code
localStorage.setItem("key", value); // value could be string, number, or any other data type
If you check the "Application" tab of your browser console, you'll notice a series of [object Object]. This is because everything you save in localStorage needs to be in string format.
To resolve the issue, wrap the data you're saving in the JSON.stringify() method. Then, check local storage again to observe the results.
Step 57
The item you retrieve is a string, as you saved it with JSON.stringify(). To view it in its original form before saving, you need to use JSON.parse().
Use getItem() to retrieve the myTaskArr array again. This time, wrap it inside JSON.parse(), assign it to the variable getTaskArrObj and log the getTaskArrObj to the console.
You can use localStorage.removeItem() to remove a specific item and localStorage.clear() to clear all items in the local storage.
*/

const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

const addOrUpdateTask = () => {
   if(!titleInput.value.trim()){
    alert("Please provide a title");
    return;
  }
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: removeSpecialChars(dateInput.value),
    description: removeSpecialChars(descriptionInput.value),
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer()
  reset()
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `)
    }
  );
};


const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");  
}

const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

if (taskData.length) {
  updateTaskContainer();
}

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});