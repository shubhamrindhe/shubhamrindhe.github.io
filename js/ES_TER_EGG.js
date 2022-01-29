import * as Interact from './interact.js';

export default class ESTEREGG {

	constructor() {}

	fetch() {
		fetch('./components/terminal/terminal.html').then((data) => {
			data.text().then((html) => {
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, 'text/html');
				document.body.appendChild(doc.body.children[0]);

				Interact.makeElementDragable(
					document.getElementById("terminal"),
					document.getElementById("terminalHeader"))
				let terminal = new Terminal();
			});
		})
	}

	reveal() {
		let style = document.createElement('link');
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('type', 'text/css');
		style.setAttribute('href', './components/terminal/terminal.css');
		style.onload = () => {
			this.fetch();
		};
		document.head.appendChild(style);

		let div = document.createElement('div');

		div.style.background = '#7756ff';
		// div.style.padding = '20px';
		div.style.height = '40px';
		div.style.width = '40px';
		div.style.display = 'flex';
		div.style.borderRadius = '10px';
		div.textContent = "Y";
		div.classList.add('centroid');
		div.classList.add('center-flex');

		document.getElementById('container').appendChild(div);

		Interact.makeElementDragable(div);
	}
}

class Terminal {

	constructor() {

		this.listen();
	}

	listen() {

	}
}
