/*
ejs/part1/lesson2.js

chapter 2 in eloquentjavascript.net
	program structure

control statements and loops
exercises at the end
*/

//some variable stuffs
var emptyvalue; //undefined
emptyvalue = emptyvalue +2; //nan

num = 120;

//typical control statement
if (num <11)
	console.log("num is less than 11");
else if (num < 111)
	console.log("num is less than 111");
else
	console.log("num is really big");

//exercises

//number sign triangle
for (i = 1; i < 8; i++) {
	var output = '';
	for (j = 0; j < i; j++){
		output = output + "#";
	}
	console.log(output)
};

/**
for (i = 1; i<101; i++){
	if (i % 3 == 0 & i % 5 == 0)
		console.log("FizzBuzz");
	else if (i % 3 === 0)
		console.log("Fizz");
	else if (i % 5 === 0)
		console.log("Buzz");
	else
		console.log(i);
}
*/

for (i = 1; i<=100; i++){
	var output = '';
	if (i % 3 == 0)
		output = 'Fizz';
	if (i % 5 == 0)
		output = output + 'Buzz';
	if (output == '')
		output = i;
	//console.log(output)
}

function fizzbuzz(fizz, buzz, length){
	for (i = 1; i<=length; i++){
		var output = ''
		if (i % fizz == 0)
			output = 'Fizz';
		if (i % buzz == 0)
			output = output + 'Buzz';
		if (output == '')
			output = i;
		console.log(output);
	}
}
fizzbuzz(4, 5, 100);

//chessboard
var size = 8;
var grid = "";

for(i = 0; i<size; i++){
	var line = "";
	//line is even
	if ((i % 2) ===0){
		for(j = 0; j<size; j++){
			if ((j % 2) === 0)
				line = line + " ";
			else
				line = line + "#";
		}
	}
	//line is odd
	else{
		for(j = 0; j<size; j++){
			if ((j % 2) == 1)
				line = line + " ";
			else
				line = line + "#";
		}
	}
	grid = grid + line + "\n"
}

//use slice to remove last linebreak "from arg1 to arg2"
console.log(grid.slice(0, -1))









