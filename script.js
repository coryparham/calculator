//Variable Declarations
let displayedNumber;
let storedNumber;
let operator;
let result;
let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let equalsButton = document.querySelector('.equals');
let decimalButton = document.querySelector('.decimal');
let clearButton = document.querySelector('#clearbtn');
let deleteButton = document.querySelector('#deletebtn');
let displayBottom = document.querySelector('#display-bottom');
let displayTop = document.querySelector('#display-top');
displayBottom.textContent = '';
displayTop.textContent = '';
let shouldResetScreen = false;
let newNumber = true;

//Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) {
        alert('Dividing by 0 is a math sin!');
        return firstNumber;
    } else {
        return a / b;   
    }
}

function operate(num1, num2, op) {
    switch (op) {
        case 'add':
            return result = add(num1, num2);
            break;
        case 'subtract':
            return result = subtract(num1, num2);
            break;
        case 'multiply':
            return result = multiply(num1, num2);
            break;
        case 'divide':
            return result = divide(num1, num2);
            break;
        default:
            break;
    }
}

function appendNumber(e) {
    if (shouldResetScreen) {
        resetScreen();
    }
    if (displayBottom.textContent == result && newNumber) {
        resetScreen();
        displayTop.textContent = result;
        storedNumber = Number(displayTop.textContent);
    }
    displayBottom.textContent = displayBottom.textContent + this.textContent;
    displayedNumber = Number(displayBottom.textContent);
    newNumber = false;
}

function appendDecimal(e) {
    if (shouldResetScreen) {
        resetScreen();
    }
    if (displayBottom.textContent == result && newNumber) {
        resetScreen();
        displayTop.textContent = result;
        storedNumber = Number(displayTop.textContent);
    }
    if (displayBottom.textContent) {
        displayBottom.textContent.includes('.') ? displayBottom.textContent : displayBottom.textContent = displayBottom.textContent + '.';
    } else {
        displayBottom.textContent = '0.';
    }
    displayedNumber = Number(displayBottom.textContent);
    newNumber = false;
}

function getResult(e) {
    if (shouldResetScreen) {
        resetScreen();
    }
    if(!storedNumber && !displayedNumber) {
        return;
    }
    if(!storedNumber && displayedNumber && !newNumber) {
        operator = this.id;
        storedNumber = Number(displayedNumber);
        displayTop.textContent = storedNumber;
        displayBottom.textContent = '';
        displayedNumber = null;
        newNumber = true;
    } else if (!displayedNumber) {
        operator = this.id;
        newNumber = true;
    } else if (!newNumber) {
        result = Number(operate(storedNumber, displayedNumber, operator));
        result = Number(roundResult(result));
        resetScreen();
        displayBottom.textContent = result;
        displayedNumber = result;
        storedNumber = null;
        operator = this.id;
        newNumber = true;
    } else {
        operator = this.id;
        displayTop.textContent = displayBottom.textContent;
        displayBottom.textContent = '';
        displayedNumber = null;
    }
}

function calculate(e) {
    if (shouldResetScreen) {
        resetScreen();
    }
    if(!storedNumber && !displayedNumber) {
        return;
    }
    if(displayedNumber && !storedNumber) {
        operator = '';
        newNumber = true;
    } else if (!newNumber) {
        result = Number(operate(storedNumber, displayedNumber, operator));
        result = Number(roundResult(result));
        displayBottom.textContent = result;
        displayTop.textContent = '';
        storedNumber = result;
        operator = '';
        newNumber = true;
    }
}

function clearAll(e) {
    displayBottom.textContent = '';
    displayTop.textContent = '';
    displayedNumber = null;
    storedNumber = null;
    operator = '';
    result = null;
}

function backSpace(e) {
    if (!newNumber) {
        displayBottom.textContent = displayBottom.textContent.slice(0, displayBottom.textContent.length - 1);
        secondNumber = Number(displayBottom.textContent);
    } else {
        clearAll();
    }
}

function roundResult(num) {
    if (String(num).includes('.')) {
        result = Number(num).toFixed(5);
    }
    return Number(result);
}

function resetScreen() {
    displayTop.textContent = '';
    displayBottom.textContent = '';
    displayedNumber = null;
    shouldResetScreen = false;
}

function clickButton(e) {
    const allButtons = document.querySelectorAll('button');
    let currentButton;
    if (e.shiftKey) {
        currentButton = document.querySelector(`button[data-key = "shift ${e.keyCode}"]`);
    } else {
        currentButton = document.querySelector(`button[data-key = "${e.keyCode}"]`);
    }
    if (currentButton) {
        currentButton.dispatchEvent(new Event('click'));
    }
}

// Event Listeners
numberButtons.forEach(button => button.addEventListener('click', appendNumber));
decimalButton.addEventListener('click', appendDecimal);
operatorButtons.forEach(button => button.addEventListener('click', getResult));
equalsButton.addEventListener('click', calculate);
clearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', backSpace);
window.addEventListener('keydown', clickButton);