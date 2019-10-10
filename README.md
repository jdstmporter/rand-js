# @jdstmporter/rand-js

A simple ES2015 random-number generator designed to use in browsers or in node servers.  It uses a cryptographically strong random  source if one is available, falling back on a non-linear, long-cycle pseudo-random source if not. 

## Choice of random number source

If `window.crypto.getRandomValues` is defined, it is used as the randomness source.  Otherwise, a pseudo-random source, based on a non-linear shift register, initialised from the value of `Date.now()` at the time the module is loaded, with (modest) amounts of entropy provided by `Math.random()`.

### Patching a custom randomness source

A custom randomness source can be used by assigning it to `window.crypto.getRandomValues`.  The function must be able to run the following snippet to produce a typed array of `n` unsigned 32-bit integers:

	n => {
		let a = new Uint32Array(n);
		window.crypto.getRandomValues(a);
		return a;
	}
	
(This is, of course, consistent with the standard DOM API).

## Usage

The package uses a singleton instance of the random number generator, which is initialised when it is firsst required.  The API is as follows:

	random = require('@jdstmporter/rand-js');
	
	// generate a single integer in the range 0 - (max-1)
	// max defaults to 2
	random.int(max);
	
	// generate a single float in the range 0 - 1 
	random.float();
	
	// generate an array of length n of integers in the range 0 - (max-1)
	// n defaults to 1, max defaults to 2 
	random.ints(max,n);
	
	// generate an array of length n of floats in the range 0 - 1 
	// n defaults to 1
	random.floats(n); 
	
	// pick a random element from an array
	// returns null if the array is empty
	let a = [ ... ];
	random.array(a);
	
	