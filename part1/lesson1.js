/*
ejs/part1/lesson1.js 

chapter 1 in eloquentjavascript.net
	values, types and operators

6 basic values in js
	numbers, strings, booleans, objects, functions, undefined values

numbers
	maximum digits is 2^64 because 64bit fixed number value memory
	if smaller there would be overflow..
	for floats and negative numbers uses a bit to hold the decimal and sign
	some floats are approximate because of the limited amount of bits

boolean comparisons
	uppercase strings are always less than lowercase
	based on unicode standard...
	nan is not equal to itself

conditional operator
	boolean ? value1 : value2
	if true, value1, false value2

*/

//the following are test console log outputs from the lesson

// unary operator that is a word
console.log(typeof 4.8);
//number

//ternary operator that takes in boolean, value, value
console.log(false ? 23948234 : "wat")
//wat



