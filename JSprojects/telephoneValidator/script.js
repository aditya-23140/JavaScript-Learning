const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');
const phoneRegex = /^(?:1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

const isValid = number => phoneRegex.test(number);

checkBtn.addEventListener('click', () => {
  if (userInput.value === "") {
    alert("Please provide a phone number");
    return;
  }

  result.textContent = isValid(userInput.value)
    ? `Valid US number: ${userInput.value}`
    : `Invalid US number: ${userInput.value}`;
  userInput.value = "";
});

clearBtn.addEventListener('click', () => {
  result.textContent = "";
})