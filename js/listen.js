var flags = {
	ctrl : undefined
}

const KeyCodes = {
	ctrl : 17,
	alt : 18,
	t : 84
};


window.onkeydown = function(e){
	console.log(e,e.key);

	switch(e.keyCode){

		case KeyCodes.ctrl:
			flags.ctrl = true;
			break;

		case KeyCodes.t:
			bringMeTerminal("./terminal");
			break;
	}

}

window.onkeypress = function(e){
	console.log(e,e.key);
}

window.onkeyup = function(e){
	console.log(e,e.key,e.keyCode);

	switch(e.keyCode){

		case KeyCodes.ctrl:
			flags.ctrl = false;
			break;


	}

}

window.onload = function(e){
	//request('./assets/ascii-arts/kali_linux',function(res){console.log(res);document.getElementById('ascii-art').innerHTML = '<span>'+res+'</span>';});

	request('./assets/ascii-arts/wrench_ascii_art',function(res){document.getElementById('ascii-art').innerHTML = '<span>'+res+'</span>';});

	document.getElementById('loader').onclick = function(e){
		if(document.body.className =='darkmode')
			document.body.className = '';
		else
			document.body.className = 'darkmode';
	}

	document.getElementById('repositories').setAttribute('onclick','handler(event,this)');

	console.log("lm");
}
