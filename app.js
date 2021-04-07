// Variables
const display = document.querySelector('.display')
const operators =  document.querySelectorAll(".operator")
const equal = document.querySelector("#equal")
const clearAll = document.querySelector('#ac')
const numBtns = document.querySelectorAll('.num')
let leftOperand;
let rightOperand;
let sign;
let result;
let isClick;

// calculation function
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

// function operate()
function operate(operator, leftSide, rightSide) {
  switch (operator) {
    case '+':
      return add(leftSide, rightSide);
    case '-':
      return subtract(leftSide, rightSide);
    case '*':
      return multiply(leftSide, rightSide);
    case '/':
      return  divide(leftSide, rightSide);
  }
}

// Clear fucntion
function clear() {
  leftOperand = 0;
  rightOperand = 0;
  sign = '';
  display.textContent = '';
  result = 0;
}

function addNumDisplay() {
  if (isClick) {
    display.textContent = '';
    isClick = false;
  }
  display.textContent += `${this.textContent}`;
}

// when operator button click run the function
operators.forEach(operator => operator.addEventListener('click', () => {
  if (!leftOperand) {
    leftOperand = parseFloat(display.textContent);
  } else if (!rightOperand) {
    rightOperand = parseFloat(display.textContent)
    result = operate(sign, leftOperand, rightOperand)
    display.textContent = result;
  } else {
    leftOperand = result;
    rightOperand = parseFloat(display.textContent);
    result = operate(sign, leftOperand, rightOperand);
    display.textContent = result;
  }
  isClick = true;
  sign = `${operator.textContent}`

}));

// Create equal button
equal.addEventListener('click', () => {
  leftOperand = result
  rightOperand = parseFloat(display.textContent);
  if (!rightOperand || !leftOperand) {
    return
  }
  display.textContent = `${operate(sign,leftOperand,rightOperand)}`;
});

// Create number button
numBtns.forEach(num => num.addEventListener('click', addNumDisplay));

// Create AClear button
clearAll.addEventListener('click', clear);