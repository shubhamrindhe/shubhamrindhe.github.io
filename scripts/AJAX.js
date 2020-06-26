function request(url,callback,Async=true,method="GET",data=null){
	var xhttp = new XMLHttpRequest();
	xhttp.overrideMimeType("text/plain");
	//xhttp.overrideMimeType("text/json");
	//xhttp.overrideMimeType("application/json");
	
	xhttp.onreadystatechange = function(e) {
		if(this.readyState == 4 && this.status == 200){
			callback(xhttp.responseText);
		}
	};
	xhttp.open(method,url,Async);
	
	//xhttp.responseType = "text";
	
	xhttp.send(data);
	
	//Asynchronous
}

	
function loadJSON(url){
	let JSobject;
	request(url,function(response){ 
		JSobject = JSON.parse(response);
	},false,"POST",null);
	return JSobject;
}


