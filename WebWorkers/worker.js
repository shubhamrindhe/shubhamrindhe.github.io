
console.log('test');

var i = 0;

let sigma = (_) => {

	let start = new Date();
	let sum = 0;
	for (i = 0; i < _; ++i) {
		sum += i;

		// let newT = new Date();
		// if (newT - start) {
		// 	start = newT;
		// 	postMessage(i);
		// }
	}

	return sum;
};

setInterval(() => {
	postMessage(i);
}, 100);

this.onmessage = e => {
	let start = new Date();
	let sum = sigma(e.data);
	console.log("sum", sum, new Date() - start);
	console.log(e.data);
}