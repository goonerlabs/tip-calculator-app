const bill = document.getElementById("inp-bill");
const tipBtns = document.querySelectorAll(".tip");
const tipCustom = document.getElementById("inp-tip");
const people = document.getElementById("inp-people");
const errorMsg = document.querySelector(".error-msg");
const results = document.querySelectorAll(".value");
const resetBtn = document.querySelector(".reset");

let billValue = 0.0; //default value
let tipValue = 0.15; //default value 15% is active
let peopleValue = 1;

function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}
// this function is used to restrict users to type only numbers and only one dot as decimal separator by ensuring that zero or more numeric characters, followed by zero or one period(s), followed by zero or more numeric characters
// The brackets mean "any character inside these brackets." You can use a hyphen (like above) to indicate a range of chars.

// The * means "zero or more of the previous expression."

// [0-9]* means "zero or more numbers"

// The backslash is used as an escape character for the period, because period usually stands for "any character."

// The ? means "zero or one of the previous character."

// The ^ represents the beginning of a string.

// The $ represents the end of a string.

// Starting the regex with ^ and ending it with $ ensures that the entire string adheres to the regex pattern.

// the .match method returns an array with all matches of the regex in the search field and null if no match is found

function validateInt(s) {
  var rgx = /^[0-9]*$/;
  return s.match(rgx);
}
// similarly, this function is used to ensure that only numbers between 0 and 9 are accepted as a valid integer input

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }
  // to replace , with . for countries that use comma notation such as europeans

  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }
  // remeber that .match() returns null if no match is found. therefore !null would  be truthy and would trigger the if statement which removes the last character from the string. it therefore prevents the user from typing in undesirable characters by removing each undesiarable characters imediately it is typed into the input by reseting bill.value after each input character is typed

  billValue = parseFloat(bill.value);
  // the bill valuse is then parsed using the parse float method which parses an argument (converting it to a string first if needed) and returns a floating point number. it would remove all white space and excess characters that cant be converted to a float if it cant retrun a float, it returns NaN

  calculateTip();
  //console.log(billValue);
}

function handleClick(event) {
  tipBtns.forEach((btn) => {
    //clear active state
    btn.classList.remove("btn-active");
    // this function handles all input btn click events. it first clears the active state on all input btns

    //set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });
  // sets the active stste by checking if the elelment that trigeered the events inner html is equal to the the btn that it is currently on in the loop which loops over all the input btns inner html and if so adds an active state to that btn

  //clear custom tip
  tipCustom.value = "";

  calculateTip();

  //console.log(tipValue);
}

function setTipCustomValue() {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }
  // please refer to the set bill value function

  tipValue = parseFloat(tipCustom.value / 100);

  //remove active state from buttons
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (tipCustom.value !== "") {
    calculateTip();
  }
  // if it isnt left empty, it calculates the tip

  //console.log(tipValue);
}

function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  if (peopleValue <= 0) {
    errorMsg.classList.add("show-error-msg");
    setTimeout(function () {
      errorMsg.classList.remove("show-error-msg");
    }, 3000);
  }
  // if the people value is less than or equal to 0 it shows the erroe message and then removes it after 3000 milliseconds and then calculates the tip

  calculateTip();
  //console.log(peopleValue);
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    // calculates the tip value if people value is >= 1
    let total = (billValue * (tipValue + 1)) / peopleValue;
    // calculates the total
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    // adds the calculated tip to the first output element using the tofixed method to return it with 2 decimal places
    results[1].innerHTML = "$" + total.toFixed(2);
  }
  // does the same as abve but for the total
}

function reset() {
  bill.value = "0.0";
  setBillValue();

  tipBtns[2].click();
  // this simulates a click event on the 3 element of the input buttons array which is the default active button since the bill value is zero all outputs would also be zero after the calculate tip function which is a part of the handleclick event function runs. even if the people value is >= 1 from the last run before it is reset in the next line

  people.value = "1";
  setPeopleValue();
}
// resets to all defaults

// event handlers
bill.addEventListener("input", setBillValue);

tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

tipCustom.addEventListener("input", setTipCustomValue);

people.addEventListener("input", setPeopleValue);

resetBtn.addEventListener("click", reset);
