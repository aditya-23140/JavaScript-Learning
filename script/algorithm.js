/*
  Back in your sortInputArray function, you need to get the values from your select elements. Since they all have the class values-dropdown, you can query them all at once.
  Use document.getElementsByClassName() to get all the elements with this class by passing in the argument "values-dropdown". Assign that to an inputValues variable with const.
  Remember that .getElementsByClassName() method returns an HTMLCollection, which is an array-like object of all the elements that have a matching class name. You can use the spread operator to convert it into an array. [...iterable object]
  You need to get the values from your select elements. These values will currently be strings and you will convert them into numbers.
  Use the map function to iterate over the array. Pass a callback function to map that takes a dropdown parameter and returns dropdown.value.
  Number() -> changes array elements data type to integer
  Because you will be writing algorithms that won't immediately have a return value, set a fallback value for array to be an empty array. Here is an example of a function that has a fallback value:
  Example Code
  const myFunction = (array = []) => {
    array.forEach() => iterate ove all elements of array;
  }

  "BUBBLE SORT"
  const bubbleSort = (array) => {
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length - 1; j++) {
            console.log(array, array[j], array[j + 1]);

            if (array[j] > array[j + 1]) {
              const temp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = temp;
            }
          }
        }

        return array;
      }

  "SELECTION SORT"
  const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }

    return array;
  }

  "INSERTION SORT"
  const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
      const currValue = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > currValue) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = currValue;
    }
    return array;
  }

  To sort the elements of an array, you can use the built-in method called .sort()
   the default behavior of .sort() is to convert the numbers values to strings, and sort them alphabetically. And "10" comes before "2" alphabetically.
  To fix this, you can pass a callback function to the .sort() method. The callback function has two parameters - for yours, use a and b. The parameters of a and b represent the number values in the array that will be sorted.
  The callback to .sort() should return a number. That number determines how to sort the elements a and b:

  If the number is negative, sort a before b.
  If the number is positive, sort b before a.
  If the number is zero, do not change the order of a and b.
  Example: 
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });
*/

const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();

  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  updateUI(sortedValues);
}

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
}

sortButton.addEventListener("click", sortInputArray);