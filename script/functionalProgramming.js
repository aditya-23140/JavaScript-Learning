/*
The global window object represents the browser window (or tab). It has an onload property which allows you to define behavior when the window has loaded the entire page, including stylesheets and scripts.
window.onload = () => {
    const container = document.getElementById("container");
    // You can add more code here to work with the container element
};
Remember that the document object has a .createElement() method which allows you to dynamically create new HTML elements.
Finally, use the .appendChild() method to add your label element to the container element.
The Array() constructor has a .fill() method which can be used to fill an array with a value. You can use this to fill your array with the start value.
Currently your range function returns an array with the correct length, but all of the values are the value of start. To fix this, chain the .map() method to your .fill() method.
Convert your start and end values in your range() call to numbers by using the .charCodeAt() method on them, passing the number 0 as the argument to that method.
Pass a callback function that takes code as the parameter and implicitly returns the value of passing code to the String.fromCharCode() method.
In earlier projects you learned about the setAttribute method. Another way to update an attribute in JavaScript is to use the following syntax:

Example Code
el.attribute = value;
The property names for hyphenated HTML attribute values, such as aria-label, follow camel case, becoming ariaLabel.

Example Code
el.ariaLabel = "Aria Label Value";
Object properties consist of key/value pairs. You can use shorthand property names when declaring an object literal. When using the shorthand property name syntax, the name of the variable becomes the property key and its value the property value.

The following example declares a user object with the properties userId, firstName, and loggedIn.

Example Code
const userId = 1;
const firstName = "John";
const loggedIn = true;

const user = {
  userId,
  firstName,
  loggedIn,
};
console.log(user); // { userId: 1, firstName: 'John', loggedIn: true }
To keep track of all of your spreadsheet's functions, declare a spreadsheetFunctions object. Using the shorthand notation syntax, set sum, average, and median as properties on the spreadsheetFunctions object.
Since your update event is running as a change event listener, the event parameter will be a change event.

The target property of the change event represents the element that changed. Assign the target property to a new variable called element.
Because the change event is triggering on an input element, the element will have a value property that represents the current value of the input.
Assign the value property of element to a new variable called value, and use .replace() to remove all whitespace.
Spreadsheet software typically uses = at the beginning of a cell to indicate a calculation should be used, and spreadsheet functions should be evaluated.
Use the && operator to add a second condition to your if statement that also checks if the first character of value is "=".
Step 45
The concept of returning a function within a function is called currying. This approach allows you to create a variable that holds a function to be called later, but with a reference to the parameters of the outer function call.

For example:

Example Code
const innerOne = elemValue(1);
const final = innerOne("A");
innerOne would be your inner function, with num set to 1, and final would have the value of the cell with the id of "A1". This is possible because functions have access to all variables declared at their creation. This is called closure.
In your elemValue function, you explicitly declared a function called inner and returned it. However, because you are using arrow syntax, you can implicitly return a function. For example:

Example Code
const curry = soup => veggies => {};
curry is a function which takes a soup parameter and returns a function which takes a veggies parameter. 
You can pass a function reference as a callback parameter. A function reference is a function name without the parentheses. For example:

Example Code
const myFunc = (val) => `value: ${val}`;
const array = [1, 2, 3];
const newArray = array.map(myFunc);
The .map() method here will call the myFunc function, passing the same arguments that a .map() callback takes. The first argument is the value of the array at the current iteration, so newArray would be [value: 1, value: 2, value: 3].
Your addCharacters(char1) is also returning a function, which returns another function. You need to make another function call to access that innermost function reference for the .map() callback. JavaScript allows you to immediately invoke returned functions:

Example Code
myFunc(1)("hi");
You'll notice that you are not using your match parameter. In JavaScript, it is common convention to prefix an unused parameter with an underscore _. You could also leave the parameter empty like so: (, char1) but it is often clearer to name the parameter for future readability.
To check if a property on a given object exists or not, you can use the hasOwnProperty() method.

The hasOwnProperty() method returns true or false depending on if the property is found on the object or not.

Here is an example of how to use the hasOwnProperty() method:

Example Code
const developerObj = {
  name: 'John',
  age: 34,
}

developerObj.hasOwnProperty('name'); // true
developerObj.hasOwnProperty('salary'); // false
1. Using map() (Creates a New Array)
The map() method applies a function to each element in the array and returns a new array with the results.

javascript
Copy code
const array = [1, 2, 3, 4, 5];
const incrementedArray = array.map(num => num + 1);
console.log(incrementedArray); // Output: [2, 3, 4, 5, 6]
Arrays have an .every() method. Like the .some() method, .every() accepts a callback function which should take an element of the array as the argument. The .every() method will return true if the callback function returns true for all elements in the array.

Here is an example of a .every() method call to check if all elements in the array are uppercase letters.

Example Code
const arr = ["A", "b", "C"];
arr.every(letter => letter === letter.toUpperCase());
*/

const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
}

const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
}

const isEven = num => num % 2 === 0;
const sum = nums => nums.reduce((acc, el) => acc + el, 0);
const average = nums => sum(nums) / nums.length;

const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
}

const spreadsheetFunctions = {
  '': args => args,
  sum,
  average,
  median,
  even: nums => nums.filter(isEven),
  someeven: nums => nums.some(isEven),
  everyeven: nums => nums.every(isEven),
  firsttwo: nums => nums.slice(0, 2),
  lasttwo: nums => nums.slice(-2),
  has2: nums => nums.includes(2),
  increment: nums => nums.map(num => num + 1),
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: nums => range(...nums),
  nodupes: nums => [...new Set(nums).values()]
}

const applyFunction = str => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = args => args.split(",").map(parseFloat);
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
}

const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = num => character => idToText(character + num);
  const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
  const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
}

window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  }
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach(number => {
    createLabel(number);
    letters.forEach(letter => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    })
  })
}

const update = event => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith('=')) {
    element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
  }
}