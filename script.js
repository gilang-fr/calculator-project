const btnNumber = document.querySelectorAll('.number');
const btnOperator = document.querySelectorAll('.operator');
const btnEqual = document.querySelector('.equal');
const btnClear = document.querySelector('.clear');
const btnAllClear = document.querySelector('.all-clear');
const gHistory = document.querySelector('.history-value');
const gOutput = document.querySelector('.output-value');

this.currentOperand = '';
this.perviousOperand = '';
this.operation = undefined;

function allClear() {
    this.currentOperand = '';
    this.perviousOperand = '';
    this.operation = undefined;
}

function clear() {
    if(this.currentOperand != '') {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    } else {
        if(this.operation != ''){
            this.operation = '';
        }else if(this.currentOperand == ''){
            this.perviousOperand = this.perviousOperand.toString().slice(0, -1);
        }
    }
}

function getNumber(number) {
    if(number == '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

function getOperator(operator) {
    if(this.currentOperand == '') return;
    if(this.perviousOperand != '') {
        compute()
    }

    this.operation = operator;
    this.perviousOperand = this.currentOperand;

    if(this.operation == '%'){
        this.currentOperand = Math.sqrt(this.currentOperand);
    } else {
        this.currentOperand = '';
    }
}

function compute() {
    let computation;
    const prev = parseFloat(this.perviousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation){
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = Math.sqrt(prev);
            break;
        default :
            return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.perviousOperand = '';
}

function getDisplay(number){
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let intDisplay;
    if(isNaN(intDigits)){
        intDisplay = '';
    } else {
        intDisplay = intDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        });
    }

    if(decimalDigits != null) {
        return `${intDisplay}.${decimalDigits}`;
    } else {
        return intDisplay;
    }


    // const floatNumber = parseFloat(number);
    // if(isNaN(floatNumber)) return '';
    // return floatNumber.toLocaleString('en');
}

function display() {
    gOutput.innerText =  getDisplay(this.currentOperand);
    if(this.operation != null){
        gHistory.innerText = `${getDisplay(this.perviousOperand)} ${this.operation}`;
    } else {
        gHistory.innerText = '';
    }
}


btnNumber.forEach(function(number){
    number.addEventListener('click', function(e){
        getNumber(e.target.innerText);
        display();
    });
});

btnOperator.forEach(function(operator){
    operator.addEventListener('click', function(e){
        let op = e.target.innerText;
        getOperator(op);
        display();
    });
});

btnEqual.addEventListener('click', function(){
    compute();
    display();
});

btnAllClear.addEventListener('click', function(){
    allClear();
    display();
});

btnClear.addEventListener('click', function(){
    clear();
    display();
});






















