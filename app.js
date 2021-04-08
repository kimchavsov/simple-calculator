// Variables
const display = document.querySelector('.display');
const operators =  document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clearAll = document.querySelector('#ac');
const numBtns = document.querySelectorAll('.num');
const dot = document.querySelector("#dot");
const deleteBtn = document.querySelector("#delete");
let leftOperand;
let rightOperand;
let sign;
let result;
let isClickOperator;
let dotClick = false;
let isEqual = false;

display.textContent = '0'
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
  leftSide = parseFloat(leftSide)
  rightSide = parseFloat(rightSide)
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
  display.textContent = `0`;
  result = 0;
  dotClick = false;
  isEqual = false;
}

function addNumDisplay() {
  if (isClickOperator) {
    display.textContent = '';
    isClickOperator = false;
    dotClick = false;
  }
  if (display.textContent === '0'){
    display.textContent = ''
  }
  display.textContent += `${this.textContent}`;
}

function addDecimal() {
  if (!dotClick) {
    display.textContent += '.'
    dotClick = true
  } 
}

function equalClick() {
  if (result) {
    leftOperand = result
  }
  rightOperand = display.textContent;
  if (!rightOperand || !leftOperand) {
    return
  }
  if (!isEqual) {
    result = operate(sign,leftOperand,rightOperand);
    display.textContent = `${result}`;
    isEqual = true;
  }
}

function deleteClick() {
  if (!isClickOperator && !isEqual) {
  display.textContent = display.textContent.substring(0, display.textContent.length - 1)
  }
}

// when operator button click run the function
operators.forEach(operator => operator.addEventListener('click', () => {
  if (!leftOperand) {
    leftOperand = display.textContent;
  } else if (!rightOperand) {
    rightOperand = display.textContent
    result = operate(sign, leftOperand, rightOperand)
    display.textContent = result;
  } else {
    if (isEqual) {
      leftOperand = result
    } else {
    leftOperand = result;
    rightOperand = display.textContent;
    result = operate(sign, leftOperand, rightOperand);
    display.textContent = result;
    }
  }
  isEqual = false;
  isClickOperator = true;
  sign = `${operator.textContent}`;
}));

// Create equal button
equal.addEventListener('click', equalClick);

// Create number button
numBtns.forEach(num => num.addEventListener('click', addNumDisplay));

// Create AClear button
clearAll.addEventListener('click', clear);

// Add dot 
dot.addEventListener('click', addDecimal);

// Delete key
deleteBtn.addEventListener('click', deleteClick);