function loadTerminal(path){
	alert("initiating terminal...");
	
	
	request(path+'/terminal.html',function(res){
	
		alert("adding html");
		
		document.body.innerHTML += res;
		
		//console.log(res);
		
		
		
		
		loadScript(path+'/scripts/terminalscript.js', function() {
			alert('script ready!');	

			
				
				//console.log(res);
				loadScript(path+'/scripts/main.js', function() {
					alert('script ready!');	

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