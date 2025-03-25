/*
In JavaScript, there are many built-in constructors that create objects. A constructor is like a regular function, but starts with a capital letter, and is initialized with the new operator.

For example, you can use the Date() constructor with the new operator to create a new Date object that returns a string with the current date and time:

Example Code
const currentDate = new Date();
console.log(currentDate);

// Output:
// Mon Aug 23 2021 15:31:00 GMT-0400 (Eastern Daylight Time)
.getDate() method returns a number between 1 and 31 that represents the day of the month for that date.
.getDate() method, which returns a number between 1 and 31 that represents the day of the month for that date.
The .getFullYear() method returns a number which represents the year for the provided date. 
The .getHours() method returns a number between 0 and 23. This represents the hour for the provided date, where 0 is midnight and 23 is 11 p.m.
The .getMinutes() method returns a number between 0 and 59 which represents the minutes for the provided date. 
In JavaScript, the change event is used to detect when the value of an HTML element has changed:
Example Code
element.addEventListener("change", () => {
    
});
The split() method is used to divide a string into substrings based on a specified separator. It then returns these substrings as elements of an array.
// returns ["h", "e", "l", "l", "o"]
"hello".split(""); 
To reverse an array of elements, you can use the reverse method. This method reverses the order of the elements in the array in place.
// returns [5, 4, 3, 2, 1]
[1, 2, 3, 4, 5].reverse(); 
 join method also takes an optional separator. If you don't provide a separator, the default separator is a comma.
 // returns "1-2-3-4-5"
[1, 2, 3, 4, 5].join("-");
*/

const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const formattedDate = `${day}-${month}-${year}`;
currentDateParagraph.textContent = formattedDate;

dateOptionsSelectElement.addEventListener("change", () => {

  switch (dateOptionsSelectElement.value) {
    case "yyyy-mm-dd":
      currentDateParagraph.textContent = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    case "mm-dd-yyyy-h-mm":
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      currentDateParagraph.textContent = formattedDate;
  }
});
