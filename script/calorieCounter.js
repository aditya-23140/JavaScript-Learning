/*
Regex in JavaScript is indicated by a pattern wrapped in forward slashes. The following example will match the string literal "hello":
Example Code
const regex = /hello/;
In regex, shorthand character classes allow you to match specific characters without having to write those characters in your pattern. Shorthand character classes are preceded with a backslash (\). The character class \s will match any whitespace character. 
Your current pattern won't work just yet. /+-\s/ looks for +, -, and a space in order. This would match +- hello but would not match +hello.
To tell the pattern to match each of these characters individually, you need to turn them into a character class. This is done by wrapping the characters you want to match in brackets. For example, this pattern will match the characters h, e, l, or o:
Example Code
const regex = /[helo]/;
Regex can also take specific flags to alter the pattern matching behavior. Flags are added after the closing /. The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match.
The e in a number input can also be an uppercase E. Regex has a flag for this, however – the i flag, which stands for "insensitive".
Example Code
/Hello/i
There is a shorthand character class to match any digit: \d

JavaScript provides a .replace() method that enables you to replace characters in a string with another string. This method accepts two arguments. The first argument is the character sequence to be replaced, which can be either a string or a regex pattern. The second argument is the string that replaces the matched sequence.
Example Code
"hello".replace(/l/g, "1"); replaces l to 1

Strings have a .match() method, which takes a regex argument. .match() will return an array of match results – containing either the first match, or all matches if the global flag is used.
Example Code
const str = 'example string';
const regex = /example/;
const result = str.match(regex); // Returns ['example']

The match method returns null when no match is found. In this case, the isInvalidInput function should return null when the input is a valid number without any scientific notation.

JavaScript has a feature called template literals, which allow you to interpolate variables directly within a string. Template literals are denoted with backticks ``, as opposed to single or double quotes. Variables can be passed in to a template literal by surrounding the variable with ${} – the value of the variable will be inserted into the string.
Example Code
const name = "Naomi";
const templateLiteral = `Hello, my name is ${name}~!`;
console.log(templateLiteral);

The querySelectorAll() method returns a NodeList of all the elements that match the selector. A NodeList is an array-like object, so you can access the elements using bracket notation.

Pass the string input[type="text"] to the querySelectorAll() method. Remember that you will need to use single quotes for your string, so that you can use double quotes within.
This will return a NodeList of all the text inputs in the form. You can then access the length property of the NodeList to get the number of entries.

The innerHTML property sets or returns the HTML content inside an element.
The addEventListener method takes two arguments. The first is the event to listen to. (Ex. 'click') The second is the callback function, or the function that runs when the event is triggered.

The insertAdjacentHtml method takes two arguments. The first argument is a string that specifies the position of the inserted element. The second argument is a string containing the HTML to be inserted. For the first argument, pass the string "beforeend" to insert the new element as the last child 

The list parameter is going to be the result of a query selector, which will return a NodeList. A NodeList is a list of elements like an array. It contains the elements that match the query selector. You will need to loop through these elements in the list.
A for...of loop is used to iterate over elements in an iterable object like an array. The variable declared in the loop represents the current element being iterated over.
Example Code
for (const element of elementArray) {
  console.log(element);
}
In programming, null is meant to represent the absence of a value. In this case, if the user enters an invalid input, you want to alert them and then return null to indicate that the function has failed.
The Number constructor is a function that converts a value to a number. If the value cannot be converted, it returns NaN which stands for "Not a Number".
Example Code
Number('10'); // returns the number 10
Number('abc'); // returns NaN

Now it's time to start putting it all together. Declare an empty calculateCalories function, which takes a parameter named e. This function will be another event listener, so the first argument passed will be the browser event – e is a common name for this parameter. You will be attaching this function to the submit event of the form. The submit event is triggered when the form is submitted. The default action of the submit event is to reload the page. You need to prevent this default action using the preventDefault() method of your e parameter.

When you need to lower case a string, you can use the toLowerCase() method. This method returns the calling string value converted to lower case.

Your output variable is an Element, which has a classList property. This property has a .remove() method, which accepts a string representing the class to remove from the element.
Example Code
const paragraphElement = document.getElementById('paragraph');
paragraphElement.classList.remove('hide');
The classList property has an .add() method which is the opposite of the .remove() method. It accepts a string representing the class to add to the element.

For submit button add event listner type is submit;
the Array object has a .from() method that accepts an array-like and returns an array. This is helpful when you want access to more robust array methods, which you will learn about in a future project.

The following example takes a NodeList of li elements and converts it to an array of li elements:
Example Code
<ul>
  <li>List 1</li>
  <li>List 2</li>
  <li>List 3</li>
</ul>
Example Code
const listItemsArray = Array.from(document.querySelectorAll('li'));
console.log(listItemsArray); //Output: (3) [li, li, li]
 */

const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener('click', clearForm);