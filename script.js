const calcDisplay = document.querySelector(".result");
const operationDisplay = document.querySelector(".operator");

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

/* -------------------------------------------------------------- */

let number = {
  one: 0,
  two: 0,
  flag: 1,
  workingOperator: "",
  displayOperator: "",
  currentValue: "",
  currentDisplay: "",
  operationDisplay: "",
  result: 0,
};

/* -------------------------------------------------------------- */

addClearListener(btnAc);
addClearListener(btnC);
addOperatorListener(btnSound);
addOperatorListener(btnNegation);
addOperatorListener(btnDivide);
addOperatorListener(btnMultiply);
addOperatorListener(btnSubtract);
addOperatorListener(btnAdd);
addEqualsListener(btnEquals);
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

/* -------------------------------------------------------------- */

function addListener(element) {
  element.addEventListener("click", () =>
    populateDisplay(element.dataset.value)
  );
}

// populate html display and number objects based on current flag
// if theres already a decimal present, dont store value
function populateDisplay(value) {
  if (value == "." && isDecimalPresent()) {
    return;
  }

  if (number.flag == 1) {
    number.currentValue = value;
    number.currentDisplay += value;
    number.one = parseFloat(number.currentDisplay);
    updateCalcTextDisplay(number.currentDisplay);
  } else if (number.flag == 2) {
    number.currentValue = value;
    number.currentDisplay += value;
    number.two = parseFloat(number.currentDisplay);
    updateCalcTextDisplay(number.currentDisplay);
  }

  logValues();
}

/* -------------------------------------------------------------- */

function addOperatorListener(element) {
  element.addEventListener("click", () => operate(element.dataset.value));
}

// Handle operator button clicks: validate the most recent input, set/record the selected operator,
// perform the pending calculation for the current operator (if any), and update the operation display.
function operate(operator) {
  updateOperationTextDisplay(operator);
  if (valueIsNumeric(number.currentValue)) {
    number.currentValue = operator;

    if (number.flag == 2) {
      switch (number.workingOperator) {
        case "+":
          add();
          break;
        case "-":
          subtract();
          break;
        case "*":
          multiply();
          break;
        case "/":
          divide();
          break;
      }
      setFlag();
    } else {
      setFlag();
      clearCalcTextDisplay();
    }
  }
  logValues();
}

/* -------------------------------------------------------------- */

function addClearListener(element) {
  element.addEventListener("click", () => clearButtons(element.dataset.value));
}

function clearButtons(value) {
  switch (value) {
    case "ac":
      resetCalc();
      break;
    case "ce":
      clearCalcTextDisplay();
      if (number.flag == 1) {
        number.one = 0;
      } else {
        number.two = 0;
      }
      break;
  }

  logValues();
}

/* -------------------------------------------------------------- */

function addEqualsListener (element) {
  element.addEventListener("click", () => equals());
}

function equals() {
  if(valueIsNumeric(number.currentValue)){
    setFlag();
  }

  switch (number.workingOperator) {
    case "+":
      add();
      break;
    case "-":
      subtract();
      break;
    case "*":
      multiply();
      break;
    case "/":
      divide();
      break;
  }
  logValues();
}

/* -------------------------------------------------------------- */
// helpers

function add() {
  const res = number.one + number.two;
  updateResultValues(res);
}

function subtract() {
  const res = number.one - number.two;
  updateResultValues(res);
}

function multiply() {
  const res = number.one * number.two;
  updateResultValues(res);
}

function divide() {
  const res = number.one / number.two;
  updateResultValues(res);
}

function updateResultValues(res) {
  number.result = res;
  number.currentDisplay = res;

  updateCalcTextDisplay(number.result);
  operationDisplay.textContent =
    number.one + ` ${number.workingOperator} ` + number.two + " =";
  
  number.one = res;
  logValues();
}

function updateCalcTextDisplay(number) {
  calcDisplay.textContent = number;
}

function updateOperationTextDisplay(operator) {
  operationDisplay.textContent = number.one + ` ${operator}`;
    number.workingOperator = operator;
}

function clearCalcTextDisplay() {
  calcDisplay.textContent = "0";
  number.currentDisplay = "";
}

function clearOperationTextDisplay() {
  operationDisplay.textContent = "";
}

function valueIsNumeric(value) {
  return !Number.isNaN(Number(value));
}

function isDecimalPresent() {
  return number.currentDisplay.includes(".");
}

function setFlag() {
  switch(number.flag) {
    case 1:
        number.flag = 2;
      break;
    case 2:
        number.flag = 1;
      break;
  }
}

function resetCalc() {
  number.one = 0;
  number.two = 0;
  number.flag = 1;
  number.workingOperator = "";
  number.currentValue = "";
  number.currentDisplay = "";
  number.operationDisplay = "";
  number.result = 0;
  calcDisplay.textContent = "0";
  operationDisplay.textContent = "";
}

function logValues() {
  console.log("--------");
  console.log("flag: ", number.flag);
  console.log("one: ", number.one);
  console.log("two: ", number.two);
  console.log("workingOperator: ", number.workingOperator);
  console.log("currentValue: ", number.currentValue);
  console.log("currentDisplay: ", number.currentDisplay);
  console.log("operationDisplay: ", number.operationDisplay);
  console.log("result: ", number.result);
}
