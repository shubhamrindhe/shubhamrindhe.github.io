import ESTEREGG from './ES_TER_EGG.js';
import HyperScript from './HyperScript.js';

let reveal = (_) => {
	let a = new ESTEREGG();
	a.reveal();

	let hs = new HyperScript();
	hs.html("div.class1.class2.class3#id");
};

window.addEventListener('load', () => {
	document.getElementById('mystery').onclick = (e) => {
		reveal();
	}

	//test
	// reveal();
});