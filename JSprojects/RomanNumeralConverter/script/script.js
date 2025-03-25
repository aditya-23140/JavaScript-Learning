const number = document.getElementById('number');
const converBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

function numberToRoman(number) {
  if(number>=4000){
    return "Please enter a number less than or equal to 3999";
  }

  if(number.length===0 || isNaN(number)){
    return "Please enter a valid number";
  }

  if(number<1){
    return "Please enter a number greater than or equal to 1";
  }

  let string = '';
  let count = 0;
  
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const thousands = ["", "M", "MM", "MMM"];

  while (number > 0) {
    count++;
    let k = number % 10;
    number = Math.floor(number / 10);
    
    if (count === 1) {
      string = ones[k] + string;
    } else if (count === 2) {
      string = tens[k] + string;
    } else if (count === 3) {
      string = hundreds[k] + string;
    } else if (count === 4) {
      string = thousands[k] + string;
    }
  }
  return string;
}

converBtn.addEventListener('click', ()=>{
  const result = numberToRoman(number.value);
  output.textContent = result;
})
