
function bringMeTerminal(path){
	console.log("bring me terminalllll");
	loadScript(path+'/scripts/load.js', function() {
		console.log('script ready!');
		loadTerminal(path);
	});
}