
function precedance(operator){
	switch (operator) {
		case "+":
		case "-":
			return 1;
			
		case "*":
		case "/":
			return 2;
			
		case "^":
			return 3;
		default :
			return 0;
	}
}

function getOprands(string){




var expression = "7.2*62+3/2-5*6+(7-2)*5";
//var expression = "7.5*32+2-6.97";
var copy = expression;

console.log("expression" + expression);

expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");



var numbers = copy.split(/[^0-9\.]+/);
var operators = expression.split("#").filter(function(n){return n});

console.log("expression" + expression);
console.log("numbers" + numbers);
console.log("operators" + operators);


var result = [];

for(i = 0; i < numbers.length; i++){
     result.push(numbers[i]);
     if (i < operators.length) result.push(operators[i]);
}

console.log(result);








	return string.split(/[\s+-/*^]+/);
}





function infixToPostfix(arithmaticString){
	var postfixExpresion = [];
	
	var stack = [];
	
	
	
	
	
	
	
	return postfixExpresion;
}






var exprn = "(1.1+22)-(33*44)/55^66";

var arr = [];


var index = 0;
exprn.split("").forEach(function(c){
	
	if(c=="+"||c=="-"||c=="*"||c=="/"||c=="^") {
		arr[++index] = c; 
		arr[++index] = ""; 
	}else if(c=="("||c==")") {
		arr[index] = c; 
		arr[++index] = ""; 
	}else{
		arr[index] += c;
	}
	
	
});

console.log(arr);








/*
for each (element in expression) {
    if ( element is an operator) {
	    push (element(pop,pop);
    }
	else {
        push next;
    }

}
*/


var expression = "3 4 * 2 5 + / 3 4 + *";
var postfix = expression.split(" ");
var postfixStack = [];



postfix.forEach( function(current) {
    if ( isOperator(current) ) {
        postfixStack.push( 
            compute( postfixStack.pop(), 
				symbolToOperator(current), 
				postfixStack.pop() 
			)
        );
    } else {
        postfixStack.push(current);
    }   
});


function isOperator(toCheck) {
    switch (toCheck) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            return true;
        default:
            return false;
    }
}

function compute(a, operator, b) {
    return operator(a,b); 
}

function symbolToOperator(symbol) {
    switch (symbol) {
        case '+': return plus;
        case '-': return minus;
        case '*': return multiply;
        case '/': return divide;
        case '%': return modulo;
    }
}

function plus(a,b) { return a + b; } 
function minus(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { return a / b; }
function modulo(a,b) { return a % b; }


console.log(postfixStack[0]);

