const gHistory = document.querySelector('.history-value');
const gOutput = document.querySelector('.output-value');

function getHistory() {
    return gHistory.innerHTML;
}

function cetakHistory(num) {
    gHistory.innerHTML = num;
}

function getOutput() {
    return gOutput.innerHTML;
}

function cetakOutput(num) {
    if(num == ""){
        gOutput.innerHTML = num;
    } else {
        gOutput.innerHTML = getFormatedNumber(num);
    }
}



function getFormatedNumber(num) {
    if(num == "-") {
        return "";
    }
     var n = Number(num);
     var value = n.toLocaleString('en');
     return value;
}

// Menghapus field display

function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

const number = document.querySelectorAll('.number');
// for (var i = 0; i < number.length; i++) {
number.forEach(function(number) {
    number.addEventListener('click', function(){
        var output = reverseNumberFormat(getOutput());
        if(output != NaN) {
            output = output + this.id;
            cetakOutput(output);
        }
    });
});

const operator = document.querySelectorAll('.operator');

// for(var i = 0; i < operator.length; i++) {
operator.forEach(function(operator) {
   operator.addEventListener('click', function() {
    if(this.id == "ac"){
        cetakHistory("");
        cetakOutput("0");
    } else if(this.id == "clear" ){
        var output = reverseNumberFormat(getOutput()).toString();
        if(output) {
            output = output.substring(0,output.length-1);
            if(output == ""){
                cetakOutput("0");
            } else {
                cetakOutput(output);
            }
        }
    } else {
        var output= getOutput();
        var history = getHistory();

        if(output == "0" && history != "") {
            if(isNaN(history[history.length-1])) {
                history = history.substring(0, history.length-1);
            }
        }
        if(output != "" || history != "") {
            output = output == ""?
            output:reverseNumberFormat(output);
            history = history + output;

            if(this.id == "=") {
                var result = eval(history);
                cetakOutput(result);
                cetakHistory("");
            } else {
                history = history + ' ' + this.id;
                cetakHistory(history);
                cetakOutput("");
            }
        }
    }
   });
});

























