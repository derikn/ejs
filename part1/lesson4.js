/*
ejs/part1/lesson4.js

chapter 4 in eloquentjavascript.net
	data structures: objects and arrays


*/

//loading variables from another jsfile.
var myModule = require('./module');
var name = myModule.name;

function phi(table) {
	return (table[3] * table[0] - table[2] * table[1]) /
		Math.sqrt((table[2] + table[3]) *
							(table[0] + table[1]) *
							(table[1] + table[3]) *
							(table[0] + table[2]));
}

var table = [76, 9, 4 ,1]
console.log(phi(table));

//table data for lycanthrope stuff
var data = require('./04_data.js')
var JOURNAL = data.JOURNAL;

//returns index of event if found else -1
function hasEvent(event, entry) {
	return entry.events.indexOf(event) != -1;
}

//assembles a 2x2 phi table 00, 01, 10, 11 for event occurence and data set
function tableFor(event, journal) {
	var table = [0, 0, 0, 0];
	for (var i = 0; i < journal.length; i++) {
		var entry = journal[i], index = 0;
		//if found move index by 1
		if (hasEvent(event, entry)) index += 1;
		//if found move index by 2
		if (entry.squirrel) index += 2;
		//increase value of index by 1
		table[index] += 1;
	}
	return table
}

var lycantable1 = tableFor('pizza', JOURNAL);
console.log(lycantable1);

//using a a map to access values by keys...
var map = {};
function storePhi(event, phi){
	map[event] = phi
}

//add data to map
storePhi('pizza', 0.069);
storePhi('touched tree', -0.081);

//output map
for (var event in map)
	console.log("The correlation for " + event + " is " + map[event]);


//loops over entries in data and event within an entry and puts in phi table
//get all phi tables and put them in a map
function gatherCorrelations(journal){
	var phis = {};
	//looping over entries
	for (var entry = 0; entry < journal.length; entry++) {
		var events = journal[entry].events;
		//looping over events
		for (var i = 0; i < events.length; i++){
			var event = events[i];
			//if event does not exist already create phi table
			if(!(event in phis))
				//use tablefor and phi functions
				phis[event] = phi(tableFor(event, journal));
		}
	}
	//return a map
	return phis;
}

var correlations = gatherCorrelations(JOURNAL);
//correlation for pizza
console.log(correlations.pizza);

//do not output correlations with a phi of less than absolute(0.1)
for (var event in correlations){
	var correlation = correlations[event];
	if (correlation > 0.1 || correlation < -0.1)
		console.log(event + ": " + correlation);
}

//loop over journal and find entries where it has the event peanut and not brushed teeth
//if so then push peanut teeth as an event to the entry 
for (var i =0; i < JOURNAL.length; i++) {
	var entry = JOURNAL[i];
	if (hasEvent("peanuts", entry) &&
		!hasEvent("brushed teeth", entry))
		entry.events.push("peanut teeth");
}

//find phi table for the new peanut teeth determination
console.log(phi(tableFor("peanut teeth", JOURNAL)));

//demonstrating array methods...
var todoList = [];
function rememberTo(task){
	todoList.push(task);
}
rememberTo('eat');
rememberTo('bathe');
console.log(todoList)

function whatNow(){
	return todoList[0];
}
console.log(whatNow());

//removes first item
function whatIsNext(){
	return todoList.shift()
}
whatIsNext()
console.log(todoList);
//adds item to the first of the list
function urgentlyRememberTo(task){
	todoList.unshift(task);
}
urgentlyRememberTo('work')
console.log(todoList);

//the variable argumeunts in a function body
function argumentCounter(){
	console.log("You gave me", arguments.length, "arguments")
}
argumentCounter(1,1,1,1);

//creating a function to add an entry (with unlimited possible events in an entry)
function addEntry(squirrel){
	var entry = {events: [], squirrel: squirrel};
	//use every arg after the first
	for (var i = 1; i < arguments.length; i++)
		entry.events.push(arguments[i]);
	JOURNAL.push(entry);
}
//add the entry to JOURNAL and output it
addEntry(true, "work", "dota", "code", "bathe");
console.log(JOURNAL[JOURNAL.length -1])



//exercises

//making a sum function and a range function
function range(start, end){
	var result = [];

	if (arguments['2']){
		var step = Number(arguments['2']);
		//if positive step arg
		if(step >= 0){
			for(var i = start; i<=end; i+=step){
				result.push(i);
			}
			return result;
		}
		//if negative step arg
		else{
			for(var i = start; i>=end; i-=Math.abs(step)){
				result.push(i);
			}
			return result;
		}
	}

	//if no step arg
	for(var i = start; i <= end; i++){
		result.push(i);
	}
	return result;
}

function sum(nums){
	var result = 0;
	for (var i in nums){
		result = result + Number(nums[i]);
	}
	return result;
}

//reversing an array
function reverseArray(arr){
	var result = [];
	for (i in arr){
		result.unshift(arr[i])
	}
	return result

}

console.log('reversed' + 	reverseArray(range(1,10)));

function reverseArrayInPlace(arr){
	var temp = 0;
	var half = Math.floor(arr.length / 2)
	for (var i = 0; i <= half; i++){
		temp = arr[i];
		arr[i] = arr[arr.length - 1 - i];
		arr[arr.length - 1 - i] = temp;
	}
}

arra = range(1,10)
//linkedlist implementation

function arrayToList(arr){
	var result = {}
	var reverse = reverseArray(arr);
	for (i in reverse){
		if (i == 0){
			var list = {
				value: reverse[i],
				rest: null
			}
		}
		else{
		var list = {
			value: reverse[i],
			rest: result
		}
		}
		result = list;
	}
	return result;
}

listarra = arrayToList(arra)

function prepend(item, list){
	var add = {
		value: item,
		rest: list
	}
	return add;
}

function nth(list, num) {
	for (var node = list; node; node = node.rest){
		if (num == 0)
			return node['value'];
		num = num - 1
	}
	return undefined
}
console.log(nth(arrayToList([10, 20, 30]), 1));


function recnth(list, num){
	function traverse(list, num){
		if (num == 0)
			return list['value'];
		else
			return traverse(list['rest'], num-1)
	}
	return traverse(list, num)
}

console.log(recnth(arrayToList([10, 20, 30]), 1));

function listToArray(list){
	//create empty container
	result = []
	//recursive function to traverse list
	function traverse(list, result){
		//base case, if end of list push value and return
		if (list['rest'] == null){
			result.push(list['value']);
			return result
		}
		//push value, and continue traversing list
		else{
			result.push(list['value']);
			return traverse(list['rest'], result);
		}
	}
	//pass in original list and empty container
	return traverse(list, result);
}

//deepequality

function compareProperties(item1, item2){
	if (item1 !== item2){
		console.log('not equal in some fashion');
		return false;
	}
	else{
		console.log('is fien');
	}
}


//recursive implementation of deep equality
//LOOKS SO SHIT
function deepEqual(obj1, obj2){
	//returns result if nothing is wrong with obj1, obj2
	var result = true;
	function compare(obj1, obj2){
		//break the recursion if result is false
		if (result == false){
			return
		}
			//if at least one thing is not an object compare them.
			if ((typeof obj1 != 'object' || typeof obj2 != 'object')){
				console.log(obj1, obj2);
				if (obj1 !== obj2){
					console.log('not equal');
					//change result to false if not equal
					result = false;
				}
			}
			//loop over all the items
			for (var i in obj1){
				//if object, traverse and find properties
				if ((typeof obj1 == 'object' && obj1 != null)
					&& (typeof obj2 == 'object' && obj2 !=null)){
						compare(obj1[i], obj2[i]);
					}
			}
		}
	//run recursive comparison function
	compare(obj1, obj2)
	return result;
}

var obj = {here: {is: "an"}, object: 2};
var obj2 = {here: {is: 'to'}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, obj2));
// false
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true



