/*
ejs/part1/lesson3.js

chapter 3 in eloquentjavascript.net
	functions

functions produce return variables or side effects

function stack
	computer keeps track of function calls in a stack.
	can run out of space 'blow the stack'

optional args
	js runs function regardless of args
	non specified args are assigned undef

closures
	local variables are kept alive in nested functions
*/

//closure example of nested functions
function multiplier(factor) {
	return function(number){
		return function(inside){
			return number * factor + inside
		}
	}
}

var twice = multiplier(2)(5)(6);

//recursion example

function power(base, exponent){
	if(exponent == 0)
		return 1;
	else
		return base * power(base, exponent-1);
}

console.log(power(2, 3))

//2nd recursive example
function findSolution(target) {
	function find(start, history) {
		if (start == target)
			return history;
		else if (start > target)
			return null;
		else
			return find(start + 5, "(" + history + " + 5)") ||
			find(start * 3, "(" + history + " *3)");
	}
	return find(1, "1")
}
console.log(findSolution(15))

//function exercises...

//simple minimum function
function min(val1, val2){
	if (val1 < val2)
		return val1
	else
		return val2
}

//modulo 2 function to test evenness
function isEven(num){
	if (num == 0)
		return true
	else if (num == 1)
		return false
	else
		return isEven(num -2)
}

//counting beans

function countBs(str){
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == "B")
		 	count = count +1;
	};
	return count
}

function countChar(str, char){
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == char)
			count = count + 1;
	};
	return count
}
console.log(countBs("BBC"))
console.log(countChar("kakkerlak","k"))



