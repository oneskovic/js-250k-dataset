/*
* Example that depicts how you can use callbacks
* in our Physics Library.
*/

// Importing Library
var phys = require('../index.js');

// Using the Mechanics Momentum Function 
// and passing in a Callback
phys.mechanics.momentum(2, 3, function(numb){
	console.log("The Answer is: " + numb) 
});

// Using the Quantum Energy Function 
// and passing in a Callback
phys.quantum.energy(2, function(numb){
	console.log("The Answer is: " + numb) 
});

/*
* Lets try and change the Speed of Light in a Vacuum
* and recalculate our answer.
*/

// Altering a Constant to increase accuracy
phys.constants.SpeedofLightVacuum = 299792458;

// Using the Quantum Energy Function Again
// and passing in a Callback
phys.quantum.energy(2, function(numb){
	console.log("The Adjusted Answer is: " + numb) 
});