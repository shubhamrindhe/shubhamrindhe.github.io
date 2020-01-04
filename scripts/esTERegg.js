
function bringMeTerminal(path){
	
	
	console.log("bring me terminalllll");
	
	loadScript(path+'/scripts/load.js', function() {
		alert('script ready!');	

		loadTerminal(path);
		
	});
	
	
}