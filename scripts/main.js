	
		

window.onload = function(){
	
	name = document.getElementById('logo').getAttribute('data');
	
	var typed2 = new Typed('#logo', {
    strings: [name],
	
	
    stringsElement: null,
					// typing speed
					typeSpeed: 50,
					// time before typing starts
					startDelay: 1000,
					// backspacing speed
					backSpeed: 20,
					// time before backspacing
					backDelay: 500,
					// loop
					loop: false,
					// false = infinite
					loopCount: false,
					// show cursor
					showCursor: true,
					// character for cursor
					cursorChar: "|",
					// attribute to type (null == text)
					attr: null,
					// either html or text
					contentType: 'html',
					// call when done callback function
					callback: function() {},
					// starting callback function before each string
					preStringTyped: function() {},
					//callback for every typed string
					onStringTyped: function() {},
					// callback for reset
					resetCallback: function() {}
  });
	
}

