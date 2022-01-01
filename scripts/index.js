import ESTEREGG from './ES_TER_EGG.js';
import HyperScript from './HyperScript.js';
// import * as Drager from './drager.js';

let reveal = (_) => {
	let a = new ESTEREGG();
	a.reveal();

	let hs = new HyperScript();
	hs.html("div.class1.class2.class3#id");
};

window.addEventListener('load', () => {
	document.getElementById('mystery').onclick = (e) => {
		reveal();

		e.target.parentElement.removeChild(e.target);
	}

	document.getElementById('themeToggle').onchange = (e) => {
		if(e.target.checked)
			document.body.className = '';
		else
			document.body.className = 'darkmode';
	}



	// Drager.makeElementDragable(document.getElementById('mystery'));

	//test
	// reveal();

	setThemeOnBasisOfCurrentTime();
});

function setThemeOnBasisOfCurrentTime() {
	const toggle = document.querySelector('#RootThemeToggle');
	const hours = new Date().getHours();
	toggle.checked = hours > 7 && hours < 20;
}