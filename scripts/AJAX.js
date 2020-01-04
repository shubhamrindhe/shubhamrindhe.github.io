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


function loadScript( url, callback ) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  if(script.readyState) {  // only required for IE <9
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName( "head" )[0].appendChild( script );
}