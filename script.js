function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mult(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}

let num1;
let num2;
let operator;
//number currently active:
let currNum = 0;

let numDisplay = document.querySelector(".num-readout");
let opDisplay = document.querySelector(".op-readout");

numDisplay.textContent = currNum;
opDisplay.textContent = operator;

const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let press = e.target.textContent;
        if (press === "/" ||
            press === "x" ||
            press === "-" ||
            press === "+") {
                operator = press;
                currNum = 0;
                displayOperator(operator);
        } else if ( Number(press) || press === "0") {
            //if currNum === 0, replace with 'press' (otherwise 0n)
            if (currNum === 0) {
                console.log("zero");
                currNum = press;
                displayNumber(currNum);
            } else { //if currNum != 0, add 'press' to currNum
                
                if (!operator) { 
                    currNum += press;
                    num1 = currNum;
                } else {
                    if (currNum === 0) {
                        currNum = press;
                        num2 = currNum;
                    } else {
                        currNum += press;
                        num2 = currNum;
                    }
                }
            }
            displayNumber(currNum);
            console.log(`currNum: ${currNum} - num1: ${num1} - num2: ${num2}`);
            //if operator selected (!undefined), store values to num2 : num1
            
        } else if (press === "=") {
            //if num1 & num2 present, evaluate expression & display result
            //clear operator, numX, currNum
            operator = "";
            displayOperator(operator);
            console.log("= pressed");
        } else {
            console.log("working on it");
        }
        
        /* switch (press) {
            case "undo":
            case ".":
            case "AC":
                console.log("function not yet available");
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                operator = e.target.textContent;
                displayOperator(operator);
                break;
            case "=":
                console.log("please wait...");
                break;
            default:
                numReadout += e.target.textContent;
                displayNumber(numReadout);
                console.log(typeof numReadout);
        } */
    })
})
function displayOperator(op) {
    operator = op; // updates the variable
    opDisplay.textContent = operator;
}

function displayNumber(num) {
    numDisplay.textContent = num;
}

function operate(a, b, op) {
    switch (op) {
        case '+': return add(a, b);
        case '-': return sub(a, b);
        case '*': return mult(a, b);
        case '/': return div(a,b);
        default:
            console.log('?');
    }
}
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
