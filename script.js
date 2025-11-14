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
  currentOperator: "",
  currentValue: "",
  currentDisplay: "",
  operationDisplay: "",
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
addOperatorListener(btnEquals);
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
}

/* -------------------------------------------------------------- */

function addOperatorListener(element) {
  element.addEventListener("click", () => operate(element.dataset.value));
}

// Handle operator button clicks: validate the most recent input, set/record the selected operator,
// perform the pending calculation for the current operator (if any), and update the operation display.
function operate(operator) {
  // Only proceed if the last input was numeric (prevents spamming operators)
  if (valueIsNumeric(number.currentValue)) {
    // Record the operator as the most recent input value to block further operator presses
    number.currentValue = operator;

    // Store the currentOperator for later use unless this is the equals operator
    if (operator != "=") {
      number.currentOperator = operator;
    }

    // Append the chosen operator to the operation display state and refresh the display
    number.operationDisplay += ` ${operator} `;
    updateOperationTextDisplay(operator);
    console.log(number.flag);

    // Execute the calculation corresponding to the incoming operator
    // (these functions operate on number.one and number.two)
    if (number.flag == 2) {
      switch (number.currentOperator) {
        case "+":
          number.one = add();
          break;
        case "-":
          number.one = subtract();
          break;
        case "*":
          number.one = multiply();
          break;
        case "/":
          number.one = divide();
          break;
      }
      setFlag();
    } else {
      setFlag();
      clearCalcTextDisplay();
    }
  }
  console.log(number.flag);
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
}

/* -------------------------------------------------------------- */

// helpers

function add() {
  const result = number.one + number.two;
  console.log(result);
  return result;
}

function subtract() {
  const result = number.one - number.two;
  console.log(result);
  return result;
}

function multiply() {
  const result = number.one * number.two;
  console.log(result);
  return result;
}

function divide() {
  const result = number.one / number.two;
  console.log(result);
  return result;
}

function equals() {
  switch (number.currentOperator) {
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
}

function updateCalcTextDisplay(number) {
  calcDisplay.textContent = number;
}

function updateOperationTextDisplay(operator) {
  operationDisplay.textContent =
    number.currentDisplay + number.operationDisplay;
}

function clearCalcTextDisplay() {
  calcDisplay.textContent = "0";
  number.currentDisplay = "";
}

function valueIsNumeric(value) {
  return !Number.isNaN(Number(value));
}

function isDecimalPresent() {
  return number.currentDisplay.includes(".");
}

function setFlag() {
  if (number.flag == 1) {
    number.flag = 2;
  } else if (number.flag == 2) {
    number.flag = 1;
    equals();
  }
}

function resetCalc() {
  number.one = 0;
  number.two = 0;
  number.flag = 1;
  number.currentOperator = "";
  number.currentValue = "";
  number.currentDisplay = "";
  number.operationDisplay = "";
  calcDisplay.textContent = "0";
  operationDisplay.textContent = "";
}
