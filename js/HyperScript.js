

const TAG = 'tag'
const CLASS = 'class'
const ID = 'id'

export default class HyperScript {

	constructor() {
		this.HTML = null;

		this.tag = '';
		this.class = '';
		this.classes = [];
		this.id = '';

		this.currentChar = '';
		this.currentlyReading = '';
	}

	html(_) {
		this.currentlyReading = TAG;
		for (let i = 0; i < _.length; ++i) {
			this.currentChar = _.charAt(i)

			switch (this.currentChar) {
				case '.':
					// this.currentlyReading = CLASS;
					this.updateReader(CLASS);
					continue;
				case '#':
					// this.currentlyReading = ID;
					this.updateReader(ID);
					continue;
				case '+':
					break;
				case '*':
					break;
				case '>':
					this.endTagParsing();
					// this.currentlyReading = TAG;
					this.updateReader(TAG);
					break;
				case '+':
					this.endTagParsing();
					// this.currentlyReading = TAG;
					this.updateReader(TAG);
					break;
				case '(':
				case ')':
					break;
				default:
					break;
			}

			this.read();
		}

		this.endTagParsing();
	}

	updateReader(_) {
		this.currentlyReading = _;

		if (this.class.length != 0) {
			this.classes.push(this.class);
			this.class = '';
		}
	}

	read() {
		switch (this.currentlyReading) {
			case TAG:
				this.tag += this.currentChar;
				break;
			case CLASS:
				this.class += this.currentChar;
				break;
			case ID:
				this.id += this.currentChar;
				break;
			default:
				break;
		}
	}

	endTagParsing() {
		let element = document.createElement(this.tag);
		this.classes.forEach(c => {
			// element.setAttribute('class', c);
			element.classList.add(c)
		});
		element.setAttribute('id', this.id);

		console.log(element);

		this.tag = '';
		this.class = '';
		this.id = '';
		this.classes = [];
	}

	css(_) {

	}

	js(_) {

	}
}