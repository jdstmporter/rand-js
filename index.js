/**
 * http://usejsdoc.org/
 */
'use strict';


class Randomiser {
	
	static hasStrongRNG() {
		try {
			return window && window.crypto && window.crypto.getRandomValues;
		}
		catch(e) {
			return false;
		}
	}
	
	constructor() {
		if (Randomiser.hasStrongRNG()) {
			this.randomiser=this.randomArrayRNG;
			this.register=[];
		}
		else {
			this.randomiser=this.randomArrayPNRG;
			let base=Date.now() & 0xffffffff;
			this.register=new Uint32Array(63);
			for(let i=0;i<63;i++) {
				this.register[i]=base;
				base = (base>>>i)+(base<<i) + Math.round(Math.random()*65536);
			}
		}
	}

	floats(n=1) {
		let out = this.randomiser(n).map(x => x/0x100000000);
		return out; 
	}
	float() {
		return this.floats()[0]; 
	}
	ints(max=2,n=1) {
		return this.floats(n).map(x => Math.floor(max*x));
	}
	int(max=2) {
		return this.ints(max)[0];
	}
	array(a=[]) {
		if(a.length===0) { return null; }
		return a[this.int(a.length)];
	}
	

	// private methods

	randomArrayRNG(n=1) {
		let a=new Uint32Array(n);
		window.crypto.getRandomValues(a);
		return Array.from(a);
	} 
	randomArrayPNRG(n=1) {
		let a=[];
		for(let i=0;i<n;i++) {
			a.push(this.step());
		}
		return a;
	}
	step(n=1) {
		for(let step=0;step<n;step++) {
			let product = this.register[31]*this.register[12];
			let sum=(this.register[61] + this.register[62] + this.register[7] + product) & 0xffffffff;
			this.register.copyWithin(1,0);
			this.register[0]=sum;
		}
		return this.register[0];
	}
}

let randomiser = new Randomiser();
module.exports= () => randomiser;

