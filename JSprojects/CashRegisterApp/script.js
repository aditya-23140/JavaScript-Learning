const inputElement = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const inCounter = document.getElementById("in-counter");
const toPay = document.getElementById("to-pay");

/**
 * penny = 0.01
 * nickel = 0.05
 * dime = 0.1
 * quarter = 0.25
 */

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

changeDue.classList.remove("change-due");

toPay.innerHTML += ` ${price.toFixed(2)}`;
inCounter.innerHTML = cid.map((row) => `${row[0]}: $${row[1]}`).join("<br>");

const dd = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

const cashChange = () => {
  let status = "";
  const amountRecieved = inputElement.value * 100;
  let toReturn = amountRecieved - price * 100;
  let revCid = cid.map(row => row.slice()).reverse();
  let changeD = [];
  let k = 0;
  if(toReturn<0){
    alert("Customer does not have enough money to purchase the item");
    changeDue.classList.remove("change-due");
    changeDue.innerHTML = '';
    return;
  }
  while (toReturn > 0 && k < revCid.length) {
    let denomAvailable = Math.floor(revCid[k][1] * 100);
    const denomName = revCid[k][0];
    let denomValue = dd[k];
    let toGive = 0;

    while (toReturn >= denomValue && denomAvailable >= denomValue) {
      toGive += denomValue;
      toReturn -= denomValue;
      denomAvailable -= denomValue;
    }
    if(toGive>0){
      changeD.push([denomName, (toGive / 100).toFixed(2)]);
      revCid[k][1] = (revCid[k][1] - toGive / 100).toFixed(2);
    }
    k++;
  }
  console.log(toReturn);
  if (toReturn === 0) {
    changeD.sort((a, b) => b[1] - a[1]);
    cid.forEach((row, index) => {
      const denomName = row[0];
      const changeEntry = revCid.find((cd) => cd[0] === denomName);
      if (changeEntry) {
        row[1] = changeEntry[1];
      }
    });
    let tot = cid.reduce((acc, row) => acc + parseFloat(row[1]), 0);
    if (tot === 0) {
      status = "Status: CLOSED";
    } else {
      status = "Status: OPEN";
    }
    let total = changeD.reduce((row, acc) => row[1] + acc, 0);
    if(total===0){
      changeDue.innerHTML = "No change due - customer paid with exact cash";
    }
    else{
      changeDue.innerHTML =
    `${status}<br>` +
    changeD.map((row) => `${row[0]}: $${row[1]}`).join("<br>");
    }
  } 
  else {
    status = "Status: INSUFFICIENT_FUNDS";
    changeDue.innerHTML = `${status}<br>`;
  }
  inCounter.innerHTML = cid.map((row) => `${row[0]}: $${row[1]}`).join("<br>");
};

purchaseBtn.addEventListener("click", () => {
  changeDue.classList.add("change-due");
  cashChange();
  inputElement.value = "";
});
