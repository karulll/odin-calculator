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

addOperatorListener(btnSound);
addOperatorListener(btnNegation);
addOperatorListener(btnAc);
addOperatorListener(btnC);
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

function addListener(element) {
  element.addEventListener("click", () =>
    populateDisplay(element.dataset.value)
  );
}

function addOperatorListener(element) {
  element.addEventListener("click", () => operate(element.dataset.value));
}

// calc logic:

let number = {
  one: 0,
  two: 0,
  operator: "",
  flag: 1,
  currentValue: "",
  currentDisplay: "",
  operationDisplay: "",
};

// if flag = 1 populate num one, flag = 2 populate num two
function populateDisplay(value) {
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

// if current value is a number, run ->
// change current value to the sent value to prevent operator spamming
// add something to update flag before running calculations (wip)
function operate(operator) {
  if (valueIsNumeric(number.currentValue)) {
    switch (operator) {
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
}

// helpers

function add() {
  return number.one + number.two;
}

function subtract() {
  return number.one - number.two;
}

function multiply() {
  return number.one * number.two;
}

function divide() {
  return number.one / number.two;
}

function updateCalcTextDisplay(number) {
  calcDisplay.textContent = number;
}

function updateOperationTextDisplay() {
  operationDisplay.textContent = number.currentDisplay + number.operator;
}

function valueIsNumeric(value) {
  return !Number.isNaN(Number(value));
}
