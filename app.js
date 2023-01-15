const { log, dir } = console;
// display:
const display = document.querySelector('.displayContainer')
const topDisplay = document.querySelector('.topDisplay');
const bottomDisplay = document.querySelector('.bottomDisplay');
// buttons:
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const clearEntryButton = document.querySelector('#clearEntry');
bottomDisplay.innerText = 0; // initial display value
const equalsButton = document.querySelector('#result');
const decimalPoint = document.querySelector('#decimalPoint');

// event listeners:
numbers.forEach(number => number.addEventListener('click', pushNumToBottomDisplay));
decimalPoint.addEventListener('click', addDecimalPoint);
clearButton.addEventListener('click', clearDisplay);
clearEntryButton.addEventListener('click', clearEntry);
operators.forEach(operator => {
    if (topDisplay.innerText.indexOf(' ') === -1) operator.addEventListener('click', addToMemory)
    operator.addEventListener('click', operate)
})
equalsButton.addEventListener('click', operate);

// functions: 

const add = (num1, num2) => bottomDisplay.innerText = num1 + num2
const subtract = (num1, num2) => bottomDisplay.innerText = num1 - num2
const multiply = (num1, num2) => bottomDisplay.innerText = num1 * num2
const divide = (num1, num2) => {
    if(num2 === 0){
        bottomDisplay.innerText = "Sorry, you can't divide by 0 ;)"
        display.classList.add('crackedScreen');
    } else bottomDisplay.innerText = num1 / num2
}

function operate(e){
    if (topDisplay.innerText !== '') {
        const operator = topDisplay.innerText.slice(-1);
        const topNum = parseFloat(topDisplay.innerText.slice(0, -2));
        const bottomNum = parseFloat(bottomDisplay.innerText);
        if (!bottomNum && bottomNum !== 0) return
        if(topDisplay.innerText.split(' ').length-1 === 1) topDisplay.innerText += ` ${bottomDisplay.innerText}` // if there is 1 space
        switch (operator) {
            case '+':
                add(topNum, bottomNum)
                break;
            case '-':
                subtract(topNum, bottomNum)
                break;
            case '×':
                multiply(topNum, bottomNum)
                break;
            case '÷':
                divide(topNum, bottomNum)
                break;
            default:
                break;
        }
        if (topDisplay.innerText.indexOf('=') === -1) topDisplay.innerText = topDisplay.innerText += ' ='
        adjustDisplay()
    }
}

function addToMemory(e) {
    if (bottomDisplay.innerText.indexOf('.') === bottomDisplay.innerText.length-1) return
    if (topDisplay.innerText.indexOf('=') !== -1) {
        topDisplay.innerText = bottomDisplay.innerText += ` ${e.target.innerText}`;
        bottomDisplay.innerText = '';
    }
    if (topDisplay.innerText === '') {
        topDisplay.innerText = bottomDisplay.innerText += ` ${e.target.innerText}`;
        bottomDisplay.innerText = '';
    };
} 

function clearEntry(e) {
    if (topDisplay.innerText.indexOf('=') !== -1) return
    if(bottomDisplay.innerText !== '0' && topDisplay.innerText.indexOf('=') === -1){
        bottomDisplay.innerText = bottomDisplay.innerText.slice(0, -1)
        if (bottomDisplay.innerText.length === 0 && !topDisplay.innerText.length) bottomDisplay.innerText = 0
    }
}

function clearDisplay(e) {
    bottomDisplay.innerText = 0;
    topDisplay.innerText = '';
    bottomDisplay.style.fontSize = ('40px');
    display.classList.remove('crackedScreen');
}

function addDecimalPoint(){
    if (bottomDisplay.innerText.indexOf('.') === -1 && bottomDisplay.innerText === '') bottomDisplay.innerText += '0.'
    if (bottomDisplay.innerText.indexOf('.') === -1 && parseInt(bottomDisplay.innerText) >= 0) bottomDisplay.innerText += '.'
}

function adjustDisplay(){
    bottomDisplay.innerText.length < 15
    ? bottomDisplay.style.fontSize = ('40px')
    : bottomDisplay.style.fontSize = ('20px');
}

function pushNumToBottomDisplay(e) {
    if (topDisplay.innerText[topDisplay.innerText.length-1] === '=') return
    bottomDisplay.innerText += e.target.value;
    if(
        bottomDisplay.innerText[0] === '0' 
        && bottomDisplay.innerText[1] !== '.' 
        && bottomDisplay.innerText.length > 1
        ) bottomDisplay.innerText = bottomDisplay.innerText.slice(1);
    adjustDisplay()
}
