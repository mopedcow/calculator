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

console.log(operate(20, 4, '-'));

