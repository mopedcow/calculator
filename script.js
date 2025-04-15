const operators = ["+","-","x","/"];
const error = ":-(";
let num1 = null;
let num2 = null;
let operator = null;
let currNum = null;
let result;
let dispNum = "0";
let dispOp = "";

const numDisplay = document.querySelector(".num-readout");
const opDisplay = document.querySelector(".op-readout");
const btns = document.querySelectorAll("button");

numDisplay.textContent = dispNum;
opDisplay.textContent = dispOp;

function log() { // for debugging
    console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator} result: ${result}`); 
} 

function displayOperator(op) { opDisplay.textContent = op; }
function displayNumber(num) { numDisplay.textContent = num; }

function add(a, b) { return Number(a + b); }
function sub(a, b) { return Number(a - b); }
function mult(a, b) { return Number(a * b); }
function div(a, b) { 
    return (b === 0) ? error 
    : Number(a / b); 
}

function operate(a, b, op) {
    a = Number(a);
    b = Number(b);
    let c;
    switch (op) {
        case '+': 
            c = add(a, b);
            break;
        case '-':
            c = sub(a, b);
            break;
        case 'x':
            c = mult(a, b);
            break;
        case '/':
            c = div(a,b);
            break;
    }
    return roundNumber(c);
}

function clearAll() {
    num1 = null;
    num2 = null;
    operator = null;
    currNum = null;
    dispOp = '';
}

function limitInput(num) { 
    return (num.length > 8) ? num.slice(0,9) : num;
}

function roundNumber(num) {
    if (num.toString().length > 9) {
        if (Number.isInteger(num)) {
            if (Math.sign === -1) {
                return error;
            } else {
                return 999999999;
            }
        } else {
            let roundTo = 8;
            let numPlace = num.toString().indexOf('.');
            return Number(num.toFixed(roundTo - numPlace));
        }
    } else {
        return num;
}}

function pressNum(press) {
    (currNum === "0" || currNum === null) ? currNum = press : currNum += press; //prevent leading 0s
    currNum = limitInput(currNum);

    if (!operator) {
        num1 = currNum;
    } else {
        num2 = currNum;
        dispOp = ""; //hide operator
    }
    dispNum = currNum;
}

function pressEquals() {
    if (num1 && num2) { //do nothing unless both nums present
        result = operate(num1, num2, operator);
        clearAll();
        dispNum = result;
    }
}

function pressOperator(press) {
    if (num1 && !num2) { //if num1 is present, but not num2, change the operator
        operator = press;
        dispOp = operator;
        dispNum = num1;
        currNum = null;
    } else if (num1 && num2) { //if num1&2 present, calculate a result
        result = operate(num1, num2, operator);
        clearAll();
        if (!Number.isFinite(result)) { //check for error
            clearAll();
        } else {
            num1 = result;
            operator = press;
        }
        dispOp = operator;
        dispNum = result;
    }
}

function pressPoint() {
    if (currNum === null) {
        currNum = "0.";
    } else if (currNum.indexOf('.') === -1) {
        currNum += '.';
    }
    dispNum = currNum;
}

function pressUndo() {
    if (currNum === null) {
        dispNum = num1;
    } else {
        if (currNum.length > 1) {
            currNum = currNum.slice(0, -1);
        } else {
            currNum = "0";
        }
        dispNum = currNum;
    }
}

function pressAC() {
    clearAll();
    dispNum = '0';
}

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let press = e.target.textContent;
          (press === "=") ? pressEquals()
        : (press === "AC") ? pressAC()
        : (press === ".") ? pressPoint()
        : (press === "undo") ? pressUndo()
        : (operators.includes(press)) ? pressOperator(press)
        : (Number(press) || press === "0") ? pressNum(press)
        : console.log("error: unidentified button press");
        log();
        displayNumber(dispNum);
        displayOperator(dispOp);
})})

log();