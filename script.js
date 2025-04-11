let num1;
let num2;
let operator;
let result;
let currNum = 0;
const operators = ["+","-","x","/"];
const error = ":-(";

const numDisplay = document.querySelector(".num-readout");
const opDisplay = document.querySelector(".op-readout");
const btns = document.querySelectorAll("button");

numDisplay.textContent = currNum;
opDisplay.textContent = operator;

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mult(a, b) { return a * b; }
function div(a, b) { return (b === 0) ? error : a / b; }

function log() { console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2} operator: ${operator} result: ${result}`); } //for debugging

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
    return limitResult(c);
}

function displayOperator(op) { opDisplay.textContent = op; }
function displayNumber(num) { numDisplay.textContent = num; }

function clearAll() {
    num1 = 0;
    num2 = 0;
    operator = "";
    currNum = 0;
    log();
}

function limitInput(num) { 
    return (num.toString().length > 8) ? Number(num.toString().slice(0,9)) : num;
}
function limitResult(num){
    if (num.toString().length > 9) {
        return (Number.isInteger(num) && Math.sign(num) === -1) //negative int
            ? error
            : (Number.isInteger(num)) 
            ? 999999999
            : Number(num.toFixed(7)); //float
    } else {
        return num;
    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let press = e.target.textContent;

        if (operators.includes(press)) {
            if (num1 && !num2) { //if num1 is present, but not num2, change the operator
                operator = press;
                displayOperator(operator);
                currNum = 0;
                log();
            } else if (num2) { //if num1&2 present, calculate a result
                result = operate(num1, num2, operator);
                clearAll();

                if (!Number.isFinite(result)) { //check for error
                    num1 = 0;
                    operator = "";
                } else {
                    num1 = result;
                    operator = press;
                }

                displayNumber(result);
                displayOperator(operator);
                log();
            }
        } else if (press === "=") {
            if (num1 && num2) { //do nothing unless both nums present
                result = operate(num1, num2, operator);
                displayNumber(result);
                clearAll();
                log();
            }
        } else if (press === "AC") {
            clearAll();
            displayNumber(currNum);
            displayOperator(operator);
        } else if ( Number(press) || press === "0" ) {
            !Number(currNum) ? currNum = press : currNum += press; //prevent leading 0s
            currNum = limitInput(currNum);

            if (!operator) {
                num1 = currNum;
            } else {
                num2 = currNum;
                displayOperator(""); //hide operator
            }

            displayNumber(currNum);
            log();
        } else {
            console.log("working on it");
        }
})})

log();