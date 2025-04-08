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
let operator = '+';

function displayNumber(num) {
    display = document.querySelector(".num-readout");
    let readout = num;
    display.textContent = readout;
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



