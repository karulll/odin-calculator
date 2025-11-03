// buttons //

const btnSound = document.querySelector('.btn-sound');
const btnNegation = document.querySelector('.btn-negation');
const btnAc = document.querySelector('.btn-ac');
const btnC = document.querySelector('.btn-c');
const btnDivide = document.querySelector('.btn-divide');
const btnMultiply = document.querySelector('.btn-multiply');
const btnSubtract = document.querySelector('.btn-subtract');
const btnAdd = document.querySelector('.btn-add');
const btnEquals = document.querySelector('.btn-equals');
const btnDecimal = document.querySelector('.btn-decimal');
const btn0 = document.querySelector('.btn-0');
const btn1 = document.querySelector('.btn-1');
const btn2 = document.querySelector('.btn-2');
const btn3 = document.querySelector('.btn-3');
const btn4 = document.querySelector('.btn-4');
const btn5 = document.querySelector('.btn-5');
const btn6 = document.querySelector('.btn-6');
const btn7 = document.querySelector('.btn-7');
const btn8 = document.querySelector('.btn-8');
const btn9 = document.querySelector('.btn-9');

addOtherListener(btnSound);
addOtherListener(btnNegation);
addOtherListener(btnAc);
addOtherListener(btnC);
addOtherListener(btnEquals);

addOperatorListener(btnDivide);
addOperatorListener(btnMultiply);
addOperatorListener(btnSubtract);
addOperatorListener(btnAdd);

addNumberListener(btnDecimal);
addNumberListener(btn0);
addNumberListener(btn1);
addNumberListener(btn2);
addNumberListener(btn3);
addNumberListener(btn4);
addNumberListener(btn5);
addNumberListener(btn6);
addNumberListener(btn7);
addNumberListener(btn8);
addNumberListener(btn9);

function addNumberListener(element) {
    element.addEventListener("click", () => operate(element.dataset.value));
}

function addOperatorListener(element) {
    element.addEventListener("click", () => operate(element.dataset.value));
}

function addOtherListener(element) {
    element.addEventListener("click", () => operate(element.dataset.value));
}

let number = {
    one: 0,
    two: 0,
    result: 0
};

function add() { number.result = Number(number.one + number.two); }
function subtract() { number.result = Number(number.one - number.two); }
function multiply() { number.result = Number(number.one * number.two); }
function divide() { number.result = Number(number.one / number.two); }

function operate(input) {
    switch(input) {
        case "/":
            divide();
            console.log(number.result);
            break;
        case "*":
            multiply();
            console.log(number.result);
            break;
        case "-":   
            subtract();
            console.log(number.result);
            break;
        case "+":
            add();
            console.log(number.result);
            break;
    }
}