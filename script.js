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
    element.addEventListener("click", operate());
    console.log(element)
}

let number = {
    one : 0,
    two: 0,
    operator: ""
};

function operate() {

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