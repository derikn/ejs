/*
ejs/part1/lesson6.js

chapter 6 in eloquentjavascript.net
	the secret life of objects


*/

//initialize rabbit object. looks like a dictionary
var rabbit = {};

//append a function/method to a variable within the object
rabbit.speak = function(line) {
	console.log("The rabbit says '" + line + "'");
};


rabbit.speak("I'm alive.");


//define a function that can be put within an object. references 'this' keyword
function speak(line) {
	console.log("The " + this.type+ " rabbit says '" + line + "'");
}

var whiteRabbit = {
	type: "white",
	speak: speak
};

var fatRabbit = {
	type: "fat",
	speak: speak
};

//the 
whiteRabbit.speak('My whiskers.');
fatRabbit.speak('i could use a carrot');

//this function is similar the the apply, call, and bind function. as the first parameter
//in these functions are passed to a this call.

/*
apply takes a thisArg, and an [array]
if the function was originally written for a different object (referencing 'this' keyword)
you can use the apply method to apply it on a different object.
*/

var redRabbit = {
	type: 'red',
};

//speak on a red rabbit with no speak method saying burp.
speak.apply(redRabbit, ["Burp!"]);

/*
call takes a thisArg and a series of arguments for the object
similar to apply, it can be called on different objects than the original one
*/

//call method by specifying specific arguments (but no object).
speak.call({type: "blue"}, "Oh my.");

speak.call({});

var empty = {};
console.log(empty.toString());

//using the create method of the original object to initialize a specific prototype

var protoRabbit = {
	speak: function(line) {
		console.log("The " + this.type + " rabbit says '" + line + "'");
	}
};

var killerRabbit = Object.create(protoRabbit);
killerRabbit.speak("Skreeeee");
killerRabbit.type = "killer";
killerRabbit.speak("Skreeeee");

//more convenient to use constructors (functions that create objects)

function Rabbit(type) {
	this.type = type;
	//this.speak = speak;
}

//PROTOTYPE SMTHSMTH
Rabbit.prototype.speak = function (line) {
	console.log("The " + this.type + " rabbit says '" + line + "'");
};

var killerRabbit = new Rabbit('killer');
var blackRabbit = new Rabbit('black');
blackRabbit.speak('hello');


//Adding mores hit to the prototype
Rabbit.prototype.dance = function(){
	console.log("The " + this.type+ " rabbit dances a jig");
}

blackRabbit.dance()



//Draw Table Function

function rowHeights(rows){
	//for each row, calculate the maximum necessary height
	return rows.map(function(row){
		return row.reduce(function(max, cell){
			return Math.max(max, cell.minHeight());
		}, 0);
	});
}

function colWidths(rows){
	//for each column, calculate the maximum necessary width
	return rows[0].map(function(_, i) {
		return rows.reduce(function(max, row) {
			return Math.max(max, row[i].minWidth());
		}, 0);
	});
}


//main draw function. uses the drawrow function to draw all the rows and then join them together with enw line characters.
function drawTable(rows){
	var heights = rowHeights(rows);
	var widths = colWidths(rows);

	function drawLine(blocks, lineNo){
		return blocks.map(function(block){
			return block[lineNo];
		}).join(" ");
	}

	function drawRow(row, rowNum) {
		var blocks = row.map(function(cell, colNum) {
			return cell.draw(widths[colNum], heights[rowNum]);
		});

		return blocks[0].map(function(_, lineNo) {
			return drawLine(blocks, lineNo);
		}).join("\n");
	}

	return rows.map(drawRow).join("\n")
}

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

var rows = [];
for (var i = 0; i < 5; i++){
	var row = [];
	for (var j = 0; j < 5; j++) {
		if ((j+i) % 2 == 0)
			row.push(new TextCell("##"));
		else
			row.push(new TextCell("  "));
	}
	rows.push(row);
}

console.log(rows);
var text = rows.map(function(row) {
	return row.map(function(cell){
		return cell.text
	});
});

console.log(text);
console.log(drawTable(rows));



var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));
// → name         height country
//   ------------ ------ -------------
//   Kilimanjaro  5895   Tanzania
//   … etcetera


console.log(MOUNTAINS[0]);
console.log(Object.keys(MOUNTAINS[1]))

var headers = Object.keys(MOUNTAINS[0]).map(function(name){
	return new UnderlinedCell(new TextCell(name));
});

console.log(headers);

console.log(headers.map(function(cell){
	return cell.inner
}));












