/*
E.Haack : 2013.10.17

The following are basic examples of core javascript, using jQuery 1.9.1

If you'd like to see something specific, I can provide anything you need.
*/
var _abcArray = ["a", "b", "c"];

//Methods and variables, executed when the DOM is ready...
$(function() {
	//local variable....
	var answer = 42;

	var isTrue = true; //constant bool...
	//example of ternary expression...
	var isTested = isTrue ? "Yes, this has been tested." : "No, still waiting...";
	
	if(!isTrue){
		return; //Exit this 'on Ready' function if not tested...
	}
	//Execute the main method...
	Example();
  
});

/*
Executed From: DOM Ready
Purpose: An example method/function that takes the 
*/
function Example()
{
	//Example using the latest 'forEach' Method... new in ECMAScript 5.1
	_abcArray.forEach(function(entry) {
		console.log(entry);
	});
	
	//standard, for loop... (normally, you'd never need to do 2 loops, but this is an example.
	var index;
	for (index = 0; index < _abcArray.length; ++index) {
		console.log(_abcArray[index]);
	}
	
	
}

$(window).load(function() {
 // executed when the browser window is completely loaded.
 alert("window is loaded");
});