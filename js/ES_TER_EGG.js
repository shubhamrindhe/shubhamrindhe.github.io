import * as Interact from './interact.js';

export default class ESTEREGG {

	static hatch() {
		let egg = new Terminal();
		egg.reveal();
		return egg
	}
}

class Monitor {

}

class Terminal {

	constructor() {
		this.sizeObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				// console.log('width', entry.contentRect.width, entries);
				if (this.terminal === entry.target) {
					console.log(entry.contentRect.height, entry.contentRect.width);
					let rect = this.terminal.getBoundingClientRect()
					this.canvas.width = rect.width;
					this.canvas.height = rect.height;
				}
			});
		});

		this.l = null;
		this.terminal = null;
		this.canvas = null;
		this.listen();
	}

	fetch() {
		fetch('./components/terminal/terminal.html').then((data) => {
			data.text().then((html) => {
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, 'text/html');
				document.body.appendChild(doc.body.children[0]);

				let TERMINAL = document.getElementById("TERMINAL");
				Interact.makeElementDragable(
					TERMINAL,
					document.getElementById("terminalHeader"))
				this.sizeObserver.observe(TERMINAL);
				fetch('../assets/ascii-arts/skull').then((res) => {
					res.text().then((text) => {
						document.getElementById("ascii-art").innerHTML = text;

						this.l();
					});
				});
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

		this.l = () => {
			this.canvas = document.getElementById('TERMINAL_CANVAS');
			this.terminal = document.getElementById('TERMINAL');

			this.terminal.width = innerWidth = 100;
			this.terminal.height = innerHeight - 100;

			let rect = this.terminal.getBoundingClientRect()



			this.canvas.width = rect.width
			this.canvas.height = rect.height
			// let a = new MatrixRain(this.canvas);
			// a.start();


			//this.terminal.style.overflow = 'visible';
		}
	}

	listen() {

	}
}

class MatrixRain {

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.loopId = null;
		this.drops = [];
		for (var i = 0; i < 1000; ++i) {
			this.drops.push(Math.random() * -200);
		}

		this.timestapm = null;
	}

	start() {
		// this.loop();
		setInterval(() => { this.loop() }, 1000 / 15);
	}

	loop() {
		if (this.timestapm == null || new Date() - this.timestapm > 0) {
			this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.renderDrops();
			this.update();

			this.timestapm = new Date();
		}
	}

	renderDrops() {
		for (let i = 0; i < this.drops.length; ++i) {
			let drop = this.drops[i];
			this.ctx.strokeStyle = 'violet';
			this.ctx.strokeText('अ', i * 10, drop);
		}
	}

	update() {
		for (let i = 0; i < this.drops.length; ++i) {
			this.drops[i] += 15;
			if (this.drops[i] > this.canvas.height) {
				this.drops[i] = Math.random() * -200;
			}
		}
	}
}
