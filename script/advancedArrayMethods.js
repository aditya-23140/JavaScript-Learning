/*
  The value of an input element is always a string, even if the input type is number. You need to convert this array of strings into an array of numbers. To do this, you can use the .map() method.
  Create a numbers variable and assign it the value of array.map(). Remember that .map() creates a new array, instead of mutating the original array.
  The .map() method takes a callback function as its first argument. This callback function takes a few arguments, but the first one is the current element being processed. Here is an example:
  Example Code
  array.map(el => {

  })
  The callback function needs to return a value. In this case, you want to return the value of each element converted to a number. You can do this by using the Number() constructor, passing the element as an argument.
  A user could put any text they want into the input box. You want to make sure that you are only working with numbers. The Number() constructor will return NaN (which stands for "not a number") if the value passed to it cannot be converted to a number.
  You need to filter these values out – thankfully, arrays have a method specifically for this. The .filter() method will allow you to filter elements out of an array, creating a new array in the process.
  The .reduce() method takes an array and applies a callback function to condense the array into a single value.
  Like the other methods, .reduce() takes a callback. This callback, however, takes at least two parameters. The first is the accumulator, and the second is the current element in the array. The return value for the callback becomes the value of the accumulator on the next iteration.
  Example Code
  array.reduce((acc, el) => {

  });
  The .reduce() method takes a second argument that is used as the initial value of the accumulator. Without a second argument, the .reduce() method uses the first element of the array as the accumulator, which can lead to unexpected results.
  To be safe, it's best to set an initial value. Here is an example of setting the initial value to an empty string:
  Example Code
  array.reduce((acc, el) => acc + el.toLowerCase(), "");


  //MEDIAN
  By default, the .sort() method converts the elements of an array into strings, then sorts them alphabetically. The .sort() method mutates the original array. This works well for strings, but not so well for numbers. For example, 10 comes before 2 when sorted as strings, but 2 comes before 10 when sorted as numbers.
  To fix this, you can pass in a callback function to the .sort() method. This function takes two arguments, which represent the two elements being compared. The function should return a value less than 0 if the first element should come before the second element, a value greater than 0 if the first element should come after the second element, and 0 if the two elements should remain in their current positions.
  To get the median of an array with an odd number of elements, you will need to find and return the middle number.

  Here is how to find the middle number of an array with an odd number of elements:
  Example Code
  arr[Math.floor(arr.length / 2)];
  Here is a longer example finding the middle number of an array with 5 elements:
  Example Code
  const numbers = [1, 2, 3, 4, 5];
  const middleNumber = numbers[Math.floor(numbers.length / 2)];
  console.log(middleNumber); // 3
  .toSorted() method, which creates a new array. 
  To calculate the occurrence you can use the following approach:
  Example Code
  const numbersArr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4];
  const counts = {};
  numbersArr.forEach((el) => {
    if (counts[el]) {
      counts[el] += 1;
    } else {
      counts[el] = 1;
    }
  });
  There are a few edge cases to account for when calculating the mode of a dataset. First, if every value appears the same number of times, there is no mode. Second, if there are multiple modes, you need to return all of them.
  To calculate this, you will use a Set. A Set is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values. You can then use the .forEach() method to iterate over the Set and calculate the mode.
  Start by creating an if statement. In the condition, create a Set with new Set() and pass it the Object.values() of your counts object. If the size property of this Set is equal to 1, that tells you every value appears the same number of times. In this case, return null from your function.
  Now you need to find the value that occurs with the highest frequency. You'll use the Object.keys() method for this.
  Start by declaring a highest variable, and assigning it the value of the counts object's Object.keys() method.
  Now you need to sort the values properly. Chain the .sort() method to your Object.keys() call. This method takes a callback function as an argument.
  For the callback, you'll need to use the counts object to compare the values of each key. You can use the a and b parameters to access the keys. Then, return the value of counts[b] minus the value of counts[a].
  Finally, access the first element in the array using bracket notation to complete your highest variable.
  If multiple numbers in a series occur at the same highest frequency, they are all considered the mode. Otherwise, the mode is the number that occurs most often, that single number is the mode.
  Thankfully, you can handle both of these cases at once with the .filter() method. Start by declaring a mode variable and assigning it the value of Object.keys(counts).
  
  You previously learned about the global Math object. Math has a .min() method to get the smallest number from a series of numbers, and the .max() method to get the largest number. Here's an example that gets the smallest number from an array:
  Example Code
  const numbersArr = [2, 3, 1];
  console.log(Math.min(...numbersArr));
  // Expected output: 1
  The variance of a series represents how much the data deviates from the mean, and can be used to determine how spread out the data are. The variance is calculated in a few steps.
  Start by declaring a getVariance function that takes an array parameter. Within that function, declare a mean variable and assign it the value of the getMean function, passing array as the argument.
  To square a value, you can use the ** operator. For example, 3 ** 2 would return 9.
  To calculate a root exponent, such as [Math Processing Error], you can use an inverted exponent [Math Processing Error].
  JavaScript has a built-in Math.pow() function that can be used to calculate exponents.
  Here is the basic syntax for the Math.pow() function:
  Example Code
  Math.pow(base, exponent);
  Here is an example of how to calculate the square root of 4:
  Example Code
  const base = 4;
  const exponent = 0.5;
  // returns 2
  Math.pow(base, exponent);
  The Math object has a .sqrt() method specifically for finding the square root of a number.
*/

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
}

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
}

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  document.querySelector("#standardDeviation").textContent = standardDeviation;
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
}