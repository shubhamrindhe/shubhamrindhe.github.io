
export function makeElementDragable(element, dragTrigger) {
	let eventTarget = (dragTrigger || element)
	if (!eventTarget instanceof HTMLElement) {
		return
	}

	var prevX = 0, prevY = 0;

	function drag(e) {
		e = e || window.event;

		let diffX = prevX - e.clientX;
		let diffY = prevY - e.clientY;
		element.style.top = (element.offsetTop - diffY) + "px";
		element.style.left = (element.offsetLeft - diffX) + "px";

		prevX = e.clientX;
		prevY = e.clientY;
	}

	function endDrag() {
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('mouseup', endDrag);
	}

	function startDrag(e) {
		e = e || window.event;
		prevX = e.clientX;
		prevY = e.clientY;

		document.addEventListener('mousemove', drag);
		document.addEventListener('mouseup', endDrag);
	}

	eventTarget.onmousedown = startDrag;

	//
	function dragTouch(e) {
		e = e || window.event;

		let diffX = prevX - e.touches[0].clientX;
		let diffY = prevY - e.touches[0].clientY;
		element.style.top = (element.offsetTop - diffY) + "px";
		element.style.left = (element.offsetLeft - diffX) + "px";

		prevX = e.touches[0].clientX;
		prevY = e.touches[0].clientY;
	}

	function endDragTouch() {
		document.removeEventListener('touchmove', dragTouch);
		document.removeEventListener('touchend', endDragTouch);
	}

	function startDragTouch(e) {
		e = e || window.event;
		prevX = e.touches[0].clientX;
		prevY = e.touches[0].clientY;

		document.addEventListener('touchmove', dragTouch);
		document.addEventListener('touchend', endDragTouch);
	}

	eventTarget.ontouchstart = startDragTouch;
}
