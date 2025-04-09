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
    operator = op; // updates the variable
    opDisplay.textContent = operator;
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
    console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2}`);
}

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let press = e.target.textContent;
        if (press === "/" ||
            press === "x" ||
            press === "-" ||
            press === "+") {
                //if !operator, update variable(operator) and set currNum=0
                //if (operator) and !num2, update variable and set currNum=0
                //if (operator && num2), operate(num1, num2, operator), then update variable and set currNum=0
                operator = press;
                currNum = 0;
                displayOperator(operator);
                console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2}`);
        } else if (press === "=") {
            //if num1 & num2 present, evaluate expression & display result
            if (num1 && num2) {
                let result = operate(num1, num2, operator);
                clearAll();
                displayNumber(result);
                displayOperator(operator);
            }
        } else if (press === "AC") {
            clearAll();
        } else if ( Number(press) || press === "0" ) {
            if (!Number(currNum)) { //if currNum === 0, replace with 'press' (otherwise 0n)
                currNum = press;
            } else { //if currNum != 0, add 'press' to currNum
                currNum += press;
            }
            if (!operator) { 
                num1 = currNum;
            } else {
                num2 = currNum;
            }
            displayNumber(currNum);
            console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2}`);
            //if operator selected (!undefined), store values to num2 : num1
        } else {
            console.log("working on it");
        }
})})

/* an Extra Credit problem for later
function allClear() {
    numReadout = 0;
    opReadout = "";
    num1 = 0;
    num2 = 0;
    operator = "";
}
*/


//displayOperator("+");
//displayNumber(8);

console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2}`);