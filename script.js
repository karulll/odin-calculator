const calcDisplay = document.querySelector(".result");
const operationDisplay = document.querySelector(".result");

const btnSound = document.querySelector(".btn-sound");
const btnNegation = document.querySelector(".btn-negation");
const btnAc = document.querySelector(".btn-ac");
const btnC = document.querySelector(".btn-c");
const btnDivide = document.querySelector(".btn-divide");
const btnMultiply = document.querySelector(".btn-multiply");
const btnSubtract = document.querySelector(".btn-subtract");
const btnAdd = document.querySelector(".btn-add");
const btnEquals = document.querySelector(".btn-equals");
const btnDecimal = document.querySelector(".btn-decimal");
const btn0 = document.querySelector(".btn-0");
const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");
const btn4 = document.querySelector(".btn-4");
const btn5 = document.querySelector(".btn-5");
const btn6 = document.querySelector(".btn-6");
const btn7 = document.querySelector(".btn-7");
const btn8 = document.querySelector(".btn-8");
const btn9 = document.querySelector(".btn-9");

addListener(btnSound);
addListener(btnNegation);
addListener(btnAc);
addListener(btnC);
addListener(btnDivide);
addListener(btnMultiply);
addListener(btnSubtract);
addListener(btnAdd);
addListener(btnEquals);
addListener(btnDecimal);
addListener(btn0);
addListener(btn1);
addListener(btn2);
addListener(btn3);
addListener(btn4);
addListener(btn5);
addListener(btn6);
addListener(btn7);
addListener(btn8);
addListener(btn9);

function addListener(element) {
  element.addEventListener("click", () =>
    populateDisplay(element.dataset.value)
  );
}
  
let number = {
  one: 0,
  two: 0,
  operator: "",
  currentDisplay: "",
  operationDisplay: "",
};

function populateDisplay(value) {
  // if value is a number or '.'
  // populate number.one & current display with the inputted value
  if(valueIsNumeric(value) || value == '.') {
    number.currentDisplay += value;
    number.one = parseFloat(number.currentDisplay);
    console.log(number.currentDisplay);

    updateCalcTextDisplay();
  }
}

function updateCalcTextDisplay() {
  calcDisplay.textContent = number.currentDisplay;
}

function updateOperationTextDisplay() {
  operationDisplay.textContent = number.currentDisplay + number.operator
}

function valueIsNumeric(value) {
  return !Number.isNaN(Number(value));
}

function operate(numOne, numTwo, operator) {
  switch (operator) {
    case "+":
      add(numOne, numTwo);
      break;
    case "-":
      subtract(numOne, numTwo);
      break;
    case "*":
      multiply(numOne, numTwo);
      break;
    case "/":
      divide(numOne, numTwo);
      break;
  }
}

function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  return numOne / numTwo;
}
