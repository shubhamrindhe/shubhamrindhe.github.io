function loadTerminal(path){


	request(path+'/terminal.html',function(res){

		console.log("adding html");

		document.body.innerHTML += res;

		//console.log(res);




		loadScript(path+'/scripts/terminalscript.js', function() {
			console.log('script ready!');



				//console.log(res);
				loadScript(path+'/scripts/main.js', function() {
					console.log('script ready!');

					setTimeout(function(){
						document.getElementById('command').onkeydown = parseCmd;
					},500);

					dragElement(document.getElementById(("terminal")),"Drager");

					window.onkeydown = null;
					window.onkeyup = null;

				});
		});



	});





}