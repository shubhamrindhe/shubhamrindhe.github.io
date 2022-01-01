import ESTEREGG from './ES_TER_EGG.js';
import HyperScript from './HyperScript.js';
// import * as Drager from './drager.js';

let reveal = (_) => {
	let a = new ESTEREGG();
	a.reveal();

	let hs = new HyperScript();
	hs.html("div.class1.class2.class3#id");
};

function toggleRootTheme(target) {
	if (target.checked)
		document.body.className = '';
	else
		document.body.className = 'darkmode';
}

function setThemeOnBasisOfCurrentTime() {
	const themeSwitch = document.querySelector('#RootThemeSwitch');
	const initialState = themeSwitch.checked;
	const hours = new Date().getHours();
	const isDay = (hours > 7 && hours < 19);

	if (initialState != isDay) {
		themeSwitch.checked = isDay;
	}

	toggleRootTheme(themeSwitch);
}

window.addEventListener('load', () => {
	document.getElementById('mystery').onclick = (e) => {
		reveal();

		e.target.parentElement.removeChild(e.target);
	}

	// Drager.makeElementDragable(document.getElementById('mystery'));

	//test
	// reveal();

	// document.getElementById('themeToggle').onchange = (e) => { toggleRootTheme(e.target); }

	document.getElementById('RootThemeSwitch').addEventListener('change', (e) => { toggleRootTheme(e.target); })
	setThemeOnBasisOfCurrentTime();
});
