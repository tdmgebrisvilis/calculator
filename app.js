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

// Click event listeners:
numbers.forEach(number => number.addEventListener('click', pushNumToBottomDisplay));
decimalPoint.addEventListener('click', addDecimalPoint);
clearButton.addEventListener('click', clearDisplay);
clearEntryButton.addEventListener('click', clearEntry);
equalsButton.addEventListener('click', operate);
operators.forEach(operator => {
    operator.addEventListener('click', changeOperator)
    operator.addEventListener('click', operate);
    operator.addEventListener('click', addToMemory);
})
// Keydown event listener:
window.addEventListener('keydown', emulateClick)

// functions: 

function emulateClick(e) {
    const key = document.querySelector(`button[data-value="${e.key}"]`);
    if (!key) return;
    key.click(); 
    key.classList.add('active');
    setTimeout(() => {
        key.classList.remove('active');
    }, 50);

}

function changeOperator(e){
    let slicedTopDisplay = topDisplay.innerText.slice(0, -1)
    if (topDisplay.innerText.indexOf(' ') === topDisplay.innerText.length-2 && bottomDisplay.innerText === '') {
        topDisplay.innerText = slicedTopDisplay += e.target.innerText
    } 
}

const add = (num1, num2) => bottomDisplay.innerText = num1 + num2
const subtract = (num1, num2) => bottomDisplay.innerText = num1 -= num2
const multiply = (num1, num2) => bottomDisplay.innerText = num1 * num2
const divide = (num1, num2) => {
    if(num2 === 0){
        bottomDisplay.innerText = "Oops, you can't divide by 0 ;)"
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
    if (bottomDisplay.innerText.indexOf('.') === bottomDisplay.innerText.length-1) return;
    if (display.classList.contains('crackedScreen')) return;
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
    adjustDisplay()
}

function clearDisplay(e) {
    bottomDisplay.innerText = 0;
    topDisplay.innerText = '';
    bottomDisplay.style.fontSize = ('40px');
    display.classList.remove('crackedScreen');
}

function addDecimalPoint(){
    if (topDisplay.innerText[topDisplay.innerText.length-1] === '=') return
    if (bottomDisplay.innerText.indexOf('.') === -1 && bottomDisplay.innerText === '') bottomDisplay.innerText += '0.'
    if (bottomDisplay.innerText.indexOf('.') === -1 && parseInt(bottomDisplay.innerText) >= 0) bottomDisplay.innerText += '.'
}

function adjustDisplay(){
    bottomDisplay.innerText.length <= 15
    ? bottomDisplay.style.fontSize = ('40px')
    : bottomDisplay.style.fontSize = ('30px');
}

function pushNumToBottomDisplay(e) {
    if (bottomDisplay.innerText.length > 14) return
    if (topDisplay.innerText[topDisplay.innerText.length-1] === '=') return
    bottomDisplay.innerText += e.target.innerText;
    if(
        bottomDisplay.innerText[0] === '0' 
        && bottomDisplay.innerText[1] !== '.' 
        && bottomDisplay.innerText.length > 1
        ) bottomDisplay.innerText = bottomDisplay.innerText.slice(1);
    adjustDisplay()
}

