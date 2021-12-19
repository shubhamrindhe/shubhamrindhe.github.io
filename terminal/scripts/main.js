function closeTerminal() {
	document.getElementById('terminal').style.display = 'none';
	document.getElementById('commandHistory').innerHTML = "";
}
function toggleTerminal() {
	document.getElementById('terminal').style.display = 'block';
}

onkeydown = function (e) {
	//alert(e.keyCode);
	switch (e.keyCode) {
		case 13:

			break;

	}
}
onkeyup = function () {

}

function bash(e) {
	switch (e.keyCode) {

	}
}

function parseCmd(e) {

	//console.log(e);
	document.getElementById('terminal').onresize = (event) => {
		alert(event);
	}

	switch (e.keyCode) {

		case 13:
			var command = document.getElementById('command').value;
			var output;



			if (command.length != 0) {
				document.getElementById('commandHistory').innerHTML += "" + command + "\n";
				document.getElementById('command').value = '';
			}
			if (command.indexOf(" ") != -1) {
				const command_tokens = command.split(" ");

				if (predefined_composite_cmds[command_tokens[0]] != undefined) {
					output = handle_composite_command(command_tokens);
				} else if (true) {
					console.log(command);
					output = eval(command);
				}


			} else {
				if (predefined_cmds[command] != undefined) {
					output = predefined_cmds[command]();
				} else {
					output = handle_command(command);
				}
			}
			console.log(output);
			document.getElementById('commandHistory').innerHTML += (output != null || output != undefined) ? output + "\n" : '';
			break;

		case 38:
			var history = document.getElementById('commandHistory').innerHTML.split('\n');
			var index = history.indexOf(document.getElementById('command').value);
			--index;
			if (index < 0) {
				index = history.length - 2;
			}
			document.getElementById('command').value = history[index];
			break;
	}
	//console.log(e.keyCode);
	//bash(e);
}
	/*
function handle_command(res){
	document.getElementById('commandHistory').innerHTML += "<span style='color:red;'>"+res+"</span>\n";
}
*/
