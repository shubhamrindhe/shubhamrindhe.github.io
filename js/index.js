import ESTEREGG from './ES_TER_EGG.js';
import HyperScript from './HyperScript.js';

let reveal = (_) => {
	let a = new ESTEREGG();
	a.reveal();

	let hs = new HyperScript();
	hs.html("div.class1.class2.class3#id");
};

function toggleRootTheme(target) {
	if (target.checked)
		document.body.classList.remove('darkmode');
	else
		document.body.classList.add('darkmode');
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

function lol(e) {
	let isAnimating = document.body.classList.contains('ripple')
	if (isAnimating) {
		return;
	}

	let isDarkMode = document.body.classList.contains('darkmode')
	let x = e.clientX
	let y = e.clientY
	let scale = d(x, y)//Math.max(innerWidth, innerHeight);
	document.body.style.setProperty('--x', x + 'px');
	document.body.style.setProperty('--y', y + 'px');
	document.body.style.setProperty('--size', scale + 'px');
	document.body.style.setProperty('--rippleColor', isDarkMode ? "white" : "black");
	document.body.classList.add('ripple');

	setTimeout(() => {
		document.body.classList.toggle('darkmode');
		document.body.classList.remove('ripple');
	}, 1000);
}

function d(x, y) {
	let _ = (p1, p2) => {
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
	}

	let center = { x: x, y: y };
	let max = -Infinity;
	[
		{x: 0, y: 0},
		{x: innerWidth, y: 0},
		{x: 0, y: innerHeight},
		{x: innerWidth, y: innerHeight}
	].forEach( (point) => {
		let dist = _(center, point);
		if (dist > max) {
			max = dist;
		}
	});

	return 2 * max;
}

window.addEventListener('load', () => {
	document.getElementById('mystery').onclick = (e) => {
		// reveal();

		e.target.parentElement.removeChild(e.target);
	}

	// Drager.makeElementDragable(document.getElementById('mystery'));

	//test
	//reveal();

	// document.getElementById('themeToggle').onchange = (e) => { toggleRootTheme(e.target); }

	// document.getElementById('RootThemeSwitch').addEventListener('change', (e) => {
	// 	// toggleRootTheme(e.target);
	// 	console.log(e);
	// })

	document.getElementById('RootThemeSwitch').addEventListener('click', (e) => {
		console.log(e.clientX, e.clientY);
		lol(e);
	});

	setThemeOnBasisOfCurrentTime();
});
