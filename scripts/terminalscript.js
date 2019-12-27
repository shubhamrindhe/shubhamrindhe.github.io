var cmd_count = 0;
var predefined_cmds = {
	clear : function(){
		document.getElementById('commandHistory').innerHTML = "";
	}
}

function handle_command(command){
	request(url[command],function(res){
		
		obj = JSON.parse(res);
		console.log(obj);
		
		repo_html = '\
<input type="checkbox" id="l'+(command+cmd_count)+'" checked="checked"/>\
<label for="'+(command+cmd_count)+'" class="blockLabel"></label>\
<div class="codeBlock" id="lold">\
';
		
		
		
		obj.forEach(function(e,i,l){
			/*
			repo_html += '\
			<div class="card">\
				<div class="repo-name"><a href="'+e.html_url+'">'+e.name+'</a></div>\
				<div>'+e.description+'</div>\
				<div class="tags"><span class="tag">tags</span></div>\
				<div class="details">\
					<span class="lang"><div class="lang-code"></div>'+e.language+'</span>\
					<span>licance : </span><span>'+(e.licance !=  undefined ? e.licance.name : 'none' )+'</span>\
				</div>\
			</div>\
			';
			*/
			
			
			
			repo_html += '<a href="'+e.html_url+'">'+e.name+'</a>\n';
			
			
		});
		
		repo_html += '</div>';
		document.getElementById('commandHistory').innerHTML += repo_html;
		return repo_html;
	});
}

var predefined_composite_cmds = {
	load : function(arguments){
		console.log(arguments);
		request('./assets/ascii-arts/'+arguments[0]+'',function(res){document.getElementById('ascii-art').innerHTML = '<span>'+res+'</span>';});
	}
}

function handle_composite_command(command){
	var parameters = command.splice(1);
	predefined_composite_cmds[command[0]](parameters);
}