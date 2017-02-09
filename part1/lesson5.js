/*
ejs/part1/lesson5.js

chapter 5 in eloquentjavascript.net
	higher order functions


*/

//exampel foreach over an array passing in a function as an argument

//loop over array and perform action each element in the array
function forEach(array, action){
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}

forEach(['wapeter','foma','granafolon'], console.log);

//creating function in argument syntax
var numbers = [1,2,3,4,5], sum = 0
//perform function over numbers array
//writes over global var sum...	
forEach(numbers, function(number){
	sum += number;
});

console.log(sum);

//using foreach in gathercorrelations

function gatherCorrelations(journal) {
  var phis = {};
  journal.forEach(function(entry) {
    entry.events.forEach(function(event) {
      if (!(event in phis))
        phis[event] = phi(tableFor(event, journal));
    });
  });
  return phis;
}

//control flow with 2 functions...
function unless(test, then) {
  if (!test) then();
}
function repeat(times, body) {
  for (var i = 0; i < times; i++) body(i);
}

repeat(10, function(n) {
  unless(n % 2, function() {
    console.log(n, "is even");
  });
});

//JSON Example with stringify and parse

var string = JSON.stringify({name: "X", born: 1980});
console.log(string);
console.log(JSON.parse(string).born)

//ancestry data

//table data for lycanthrope stuff
var data = require('./ancestry.js')
var ANCESTRY_FILE = data.ancestry;
var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry.length);


//filter function
//a filter takes in an array and a test, and returns a new array filtered based on test
function filter(array, test){
	var passed = [];

	//using foreach
	array.forEach(function(entry){
		if(test(entry))
			passed.push(entry);
	})
	/* for loop
	for (var i= 0; i < array.length; i++){
		if (test(array[i]))
			passed.push(array[i]);
	}
	*/
	return passed;
}

console.log(filter(ancestry, function(person){
	return person.born > 1900 && person.born < 1925;
}));


console.log(ancestry.filter(function(person){
	return person.father == "Carel Haverbeke";
}));

//map function
//a map takes in an array and a transformation.
// returns an array based on criteria. ie only get the names or ages.
function map(array, transform){
	var mapped = [];
	array.forEach(function(entry){
		mapped.push(transform(entry));
	});
	return mapped;
}

var overNinety = ancestry.filter(function(person){
	return person.died - person.born > 90;
});

console.log(overNinety);
console.log(map(overNinety, function(person){
	return person.name;
}));

//reduce function
//computes a value based on a given array
function reduce(array, combine, start){
	var current = start;
	array.forEach(function(entry){
		current = combine(current, entry);
	});
	return current;
}

console.log(reduce([1,2,3,4], function(a, b){
	return a + b;
}, 0));

console.log(ancestry.reduce(function(min, cur){
	console.log(cur.born, min.born);
	if (cur.born < min.born) return cur;
	else return min;
}));


function average(array){
	function plus(a,b){ return a+b;}
	return array.reduce(plus) / array. length;
}

//helper functions
//function to return candidates age
function age(p) { return p.died - p.born; }
//function to return m
function male(p) { return p.sex == "m"; }
//test to return f
function female(p) {return p.sex =='f'; }

//filter out all non male candidates
console.log(ancestry.filter(male));
//transform array to only ages
console.log(ancestry.filter(male).map(age));
//reduce array to one average value
console.log(average(ancestry.filter(male).map(age)));

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person;
})



function reduceAncestors(person, f, defaultValue){
	function valueFor(person) {
		if (person == null)
			return defaultValue;
		else
			return f(person, valueFor(byName[person.mother]),
				valueFor(byName[person.father]));
	}
	return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather){
	if (person.name == "Pauwels van Haverbeke")
		return 1;
	else
		return(fromMother+ fromFather) / 2;
}

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);


//bind method
var theSet = ["Carel Haverbeke",
							"Maria van Brussel",
							"Donald Duck"];
function isInSet(set, person) {
	return set.indexOf(person.name) > -1;
}

console.log(ancestry.filter(function(person){
	return isInSet(theSet, person);
}));

console.log(ancestry.filter(isInSet.bind(null, theSet)));

console.log('**********EXERCISES************');
//exerciseslatten array

var arrays = [[1,2,3], [4,5], [6]];

console.log(arrays.reduce(function(cur, next){
	return cur.concat(next);
}));

//mother child age difference
/*for each entry  if mother not null
get born, get mother's born, put difference in age into array
*/
function hasKnownMother(p) {
	if (p.mother)
		if (byName[p.mother] != undefined)
			return true;
}


console.log(average(ancestry.filter(hasKnownMother).map(function(p){
	var motherBorn = byName[p.mother].born
	return p.born - motherBorn;
})));

var lifespan = ancestry.map(function(p){
	return {'century': Math.ceil(p.died / 100), 
	'life': (p.died-p.born)}
	})

var groups = {}
lifespan.map(function(p){
	if (!(p.century in groups)){
		var list = [];
		lifespan.filter(function(entry){
			return entry.century == p.century
			}).forEach(function(p){
				list.push(p.life);
			});
	
		groups[p.century] = average(list);
	}
})

console.log(groups);

function every(array, check){
	var result = true;
	for (i = 0; i < array.length; i++){
		if(!(check(array[i])))
			result = false;
			break;
	}
	return result;
}

function some(array, check){
	var result = false;
	for (i = 0; i<array.length; i++){
		if(check(array[i]))
			result = true;
			break;
	}
	return result;
}

console.log(every([NaN,NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(every([4, NaN, 4], isNaN));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));

