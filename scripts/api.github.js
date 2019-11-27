const USR = "shubhamrindhe";
var url = {
	user : "https://api.github.com/users/"+USR+"",
	repos : "https://api.github.com/users/"+USR+"/repos"
}

var handlers = {
	
	repos : function(evt,obj,res){
		document.getElementById('container').innerHTML = gen_repos(res);
	}
	
}

function gen_repos(res){
	obj = JSON.parse(res);
	console.log(obj);
	
	repo_html = '';
	
	obj.forEach(function(e,i,l){
		
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
		
		
	});
	return repo_html;
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