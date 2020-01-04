function linkScript(url,callback){
	
	
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

request('./terminal.html',function(res){
	
	alert("adding html");
	
	document.body.innerHTML += res;
	
	//console.log(res);
	
	
	
	
	loadScript('./scripts/main.js', function() {
		alert('script ready!');	

		setTimeout(function(){ 
			document.getElementById('command').onkeydown = parseCmd;
		},500);
		
		dragElement(document.getElementById(("terminal")),"Drager");
		
	});
	
	
	
});


function loadCSS( url, callback ) {
  /*
  var link = document.createElement( "link" )
  link.type = "text/css";
  if(link.readyState) {  // only required for IE <9
    link.onreadystatechange = function() {
      if ( link.readyState === "loaded" || link.readyState === "complete" ) {
        link.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    link.onload = function() {
      callback();
    };
  }

  link.href = url;
  document.getElementsByTagName( "head" )[0].appendChild( link );
  */
  
	//<![CDATA[
	if(document.createStyleSheet) {
	  document.createStyleSheet(url);
	}
	else {
	  var styles = "@import url('"+url+"');";
	  var newSS=document.createElement('link');
	  newSS.rel='stylesheet';
	  newSS.href='data:text/css,'+escape(styles);
	  document.getElementsByTagName("head")[0].appendChild(newSS);
	}
	//]]>
	callback();
}


// call the function...
/*
loadCSS('./terminal/stylesheets/terminal.css', function() {
  alert('stylesheet ready!'); 
});
*/

function loadHTML(){
	
}


/*
loadScript('./scripts/terminalscript.js', function() {
  alert('script ready!');

	document.body.innerHTML += "<input type='checkbox' id='cmd8' checked='checked'/>\
		<label for='cmd8' class='blockLabel' ></label>\
		<div class='codeBlock' id='lol1d'>\
		gello\
	</div>";
  
});
*/



function bringMeTerminal(){
	
	
	console.log("bring me terminal");
	
}