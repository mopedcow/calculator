let num1;
let num2;
let operator;
//number currently active:
let currNum = 0;

const numDisplay = document.querySelector(".num-readout");
const opDisplay = document.querySelector(".op-readout");
const btns = document.querySelectorAll("button");

numDisplay.textContent = currNum;
opDisplay.textContent = operator;

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mult(a, b) { return a * b; }
function div(a, b) { return a / b; }

function operate(a, b, op) {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+': return add(a, b);
        case '-': return sub(a, b);
        case 'x': return mult(a, b);
        case '/': return div(a,b);
        default:
            console.log('?');
}}

function displayOperator(op) {
    opDisplay.textContent = op;
}

function displayNumber(num) {
    numDisplay.textContent = num;
}

function clearAll() {
    num1 = 0;
    num2 = 0;
    operator = "";
    currNum = 0;
    displayNumber(currNum);
    displayOperator(operator);
}

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let press = e.target.textContent;
        if (press === "/" || press === "x" || press === "-" || press === "+") {
            if (num1 && !num2) { //if num1 is present, but not num2, change the operator
                operator = press;
                currNum = 0;
                displayOperator(operator);
                console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator}`);
            } else if (num1 && num2) { //if num1&2 present, calculate a result
                let result = operate(num1, num2, operator);
                clearAll();
                num1 = result;
                operator = press;
                displayNumber(result);
                displayOperator(operator);
                console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator}`);
            }
                
        } else if (press === "=") {
            if (num1 && num2) { //do nothing unless both nums present
                let result = operate(num1, num2, operator);
                clearAll();
                displayNumber(result);
                displayOperator(operator);
                console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator}`);
            }
        } else if (press === "AC") {
            clearAll();
        } else if ( Number(press) || press === "0" ) {

            !Number(currNum) ? currNum = press : currNum += press; //prevent leading 0s
            
            if (!operator) {
                num1 = currNum;
            } else {
                num2 = currNum;
                displayOperator("");
            }
            displayNumber(currNum);
            console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator}`);
        } else {
            console.log("working on it");
        }
})})

console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator}`);