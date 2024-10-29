function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if(b == 0){
        return "Cannot divide by zero";
    }
    return a/b;
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');
const operators = ['+', '-', '*', '/'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let firstOperand = '';
let secondOperand = '';
let operator = '';

function onClick(e){
    console.log(e.target.value);
    // switch case 
    switch(e.target.value){
        case 'AC':
            display.textContent = '';
            firstOperand = '';
            secondOperand = '';
            operator = '';
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if(firstOperand == ''){
                return;
            }
            if(secondOperand == ''){
                operator = e.target.value;
                display.textContent += operator;
            }
            else{
                firstOperand = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
                secondOperand = '';
                operator = e.target.value;
                display.textContent = firstOperand + operator;
            }
            break;
        case '=':
            if(firstOperand == '' || secondOperand == ''){
                return;
            }
            firstOperand = String(operate(operator, parseFloat(firstOperand), parseFloat(secondOperand)));
            secondOperand = '';
            operator = '';
            display.textContent = firstOperand;
            break;
        case '.':
            if(operator == ''){
                if(firstOperand.includes('.')){
                    return;
                }
                firstOperand += e.target.value;
                display.textContent += e.target.value;
            }
            else{
                if(secondOperand.includes('.')){
                    return;
                }
                secondOperand += e.target.value;
                display.textContent += e.target.value;
            }
            break;
        case 'sign':
            if(operator == ''){
                firstOperand = -parseFloat(firstOperand);
                display.textContent = firstOperand;
            }
            else{
                secondOperand = -parseFloat(secondOperand);
                display.textContent = firstOperand + operator + secondOperand;
            }
            break;
        case '%':
            if(operator == ''){
                if(firstOperand == '') return;
                firstOperand = String(parseFloat(firstOperand)/100);
                display.textContent = firstOperand;
            }
            else{
                secondOperand = String(parseFloat(secondOperand)/100);
                display.textContent = firstOperand + operator + secondOperand;
            }
            break;
        case 'backspace':
            if(operator == ''){
                firstOperand = firstOperand.slice(0, -1);
                display.textContent = firstOperand;
            }
            else{
                secondOperand = secondOperand.slice(0, -1);
                display.textContent = firstOperand + operator + secondOperand;
            }
            break;
        default:
            if(!digits.includes(e.target.value)) return;
            if(operator == ''){
                if(firstOperand == ''){
                    display.textContent = '';
                }
                firstOperand += e.target.value;
                display.textContent += e.target.value;
            } 
            else{
                secondOperand += e.target.value;
                display.textContent += e.target.value;
            }
            break;
            
    }

}

buttons.addEventListener('click', onClick);