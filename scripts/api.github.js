const USR = "shubhamrindhe";
var url = {
	user : "https://api.github.com/users/"+USR+"",
	repos : "https://api.github.com/users/"+USR+"/repos"
}

var handlers = {
	
	repos : function(evt,obj,res){
		document.getElementById('container').innerHTML = res;
	}
	
}

function handler(evt,obj){
	//console.log(evt,obj);
	document.getElementById('container').innerHTML = '';
	document.getElementById('ajax_indicator').classList.toggle('active');
	request(url[obj.id],function(res){
		handlers[obj.id](evt,obj,res);
		document.getElementById('ajax_indicator').classList.toggle('active');
	});
}