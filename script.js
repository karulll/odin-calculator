const calcDisplay = document.querySelector(".result");
const operationDisplay = document.querySelector(".operator");

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
  operatorFlag: "false",
  currentValue: "",
  currentDisplay: "",
  operationDisplay: "",
  result: 0,
};

/* -------------------------------------------------------------- */

addClearListener(btnAc);
addClearListener(btnC);
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

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    populateDisplay(key);
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    event.preventDefault();
    operate(key);
  }
  if (key === "Enter" || key === "=") {
    event.preventDefault();
    equals();
  }

  if (key === "Escape") {
    clearButtons("ac");
  } else if (key === "Backspace") {
    clearButtons("ce");
  }
});

/* -------------------------------------------------------------- */

function addListener(element) {
  element.addEventListener("click", () =>
    populateDisplay(element.dataset.value)
  );
}

// abomination

function populateDisplay(value) {
  if (value == "." && isDecimalPresent()) {
    return;
  }

  if (number.flag == 1) {

    if (value == "." && number.one == 0) {
      value = "0.";
    }
    if (value == "0" && number.one == 0 && !isDecimalPresent()) {
      return;
    }

    number.currentDisplay += value;
    number.one = parseFloat(number.currentDisplay);
    if (value == "0." || value == ".") {
      updateCalcTextDisplay(number.currentDisplay);
    } else {
      updateCalcTextDisplay(parseFloat(number.currentDisplay));
    }

  } else if (number.flag == 2 || value == ".") {

    if (value == "." && number.two == 0) {
      value = "0.";
    }
    if (value == "0" && number.two == 0 && !isDecimalPresent()) {
      return;
    }
    
    number.currentDisplay += value;
    number.two = parseFloat(number.currentDisplay);
    if (value == "0." || value == ".") {
      updateCalcTextDisplay(number.currentDisplay);
    } else {
      updateCalcTextDisplay(parseFloat(number.currentDisplay));
    }

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

  number.currentValue = operator;
  setActiveMode(operator);
  if (number.two == 0) {
    number.workingOperator = operator;
    clearCalcTextDisplay();
  } else {
    number.operatorFlag = "true";
    equals(operator);
  }
  number.flag = 2;
  logValues();
}

/* -------------------------------------------------------------- */

function addEqualsListener(element) {
  element.addEventListener("click", () => equals());
}

function equals() {
  if (number.two != 0) {
    switch (number.workingOperator) {
      case "+":
        updateResultValues(add());
        break;
      case "-":
        updateResultValues(subtract());
        break;
      case "*":
        updateResultValues(multiply());
        break;
      case "/":
        divide();
        updateResultValues(divide());
        break;
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
      if (number.flag == 1) {
        const numberStr = String(number.one);
        number.one = numberStr.substring(0, numberStr.length - 1);
        number.currentDisplay = number.one;
        if (number.currentDisplay == "") {
          number.currentDisplay = "0";
        }
        number.two = parseFloat(number.currentDisplay);
        updateCalcTextDisplay(number.currentDisplay);
      } else {
        const numberStr = String(number.two);
        number.two = numberStr.substring(0, numberStr.length - 1);
        number.currentDisplay = number.two;
        if (number.currentDisplay == "") {
          number.currentDisplay = "0";
        }
        number.two = parseFloat(number.currentDisplay);
        updateCalcTextDisplay(number.currentDisplay);
      }
      break;
  }

  logValues();
}

/* -------------------------------------------------------------- */

function setActiveMode(value) {
  [btnDivide, btnMultiply, btnSubtract, btnAdd].forEach((e) =>
    e.classList.remove("active")
  );

  switch (value) {
    case "/":
      btnDivide.classList.add("active");
      break;
    case "*":
      btnMultiply.classList.add("active");
      break;
    case "-":
      btnSubtract.classList.add("active");
      break;
    case "+":
      btnAdd.classList.add("active");
      break;
    default:
      [btnDivide, btnMultiply, btnSubtract, btnAdd, btnDecimal].forEach((e) =>
        e.classList.remove("active")
      );
      break;
  }
}

/* -------------------------------------------------------------- */

// helpers

function add() {
  return (res = number.one + number.two);
}

function subtract() {
  return (res = number.one - number.two);
}

function multiply() {
  return (res = number.one * number.two);
}

function divide() {
  return (res = number.one / number.two);
}

function updateResultValues(res) {
  number.result = res;
  number.currentDisplay = res;

  updateCalcTextDisplay(number.result);
  operationDisplay.textContent =
    number.one + ` ${number.workingOperator} ` + number.two + " =";

  number.one = res;
  number.two = 0;
  number.flag = 1;

  setActiveMode(0);

  if (number.operatorFlag == "true") {
    number.workingOperator = number.currentValue;
    number.operatorFlag = "false";
    number.flag = 2;
    updateOperationTextDisplay(number.workingOperator);
    setActiveMode(number.workingOperator);
    clearCalcTextDisplay();
  }

  logValues();
}

function updateCalcTextDisplay(number, decimal) {
  if (decimal == 1) {
    calcDisplay.textContent = number + ".";
  } else {
    calcDisplay.textContent = number;
  }
}

function updateOperationTextDisplay(operator) {
  if (!valueIsNumeric(number.one)) {
    operationDisplay.textContent = 0 + ` ${operator}`;
  } else {
    operationDisplay.textContent = number.one + ` ${operator}`;
  }
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
  return String(number.currentDisplay).includes(".");
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
  operationDisplay.textContent = "hello :)";
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

function dotZeroCheck(value) {}
