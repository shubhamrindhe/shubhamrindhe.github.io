function Circle(x,y,r,vx,vy){
	this.x=x;
	this.y=y;
	this.r=r;
	this.vx=vx;
	this.vy=vy;
	this.maxR = 20;
	this.minR = 0;
	this.color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			
	this.draw = function(){
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.fillStyle = this.color;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		//ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
	this.update = function(){
		//this.draw();
		if(this.x+this.r > canvas.width||this.x-this.r<0){
			this.vx = -this.vx;
		}
		if(this.y+this.r > canvas.height||this.y-this.r<0){
			this.vy = -this.vy;
		}
		this.x += this.vx;
		this.y += this.vy;
		this.draw();
// Interactivity
		if( mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50  ){
			if(this.r < this.maxR){
				this.r += 1;
			}
		}else if(this.r> this.minR){
			this.r -= 1;
		}	
	}

}
			

		
function animate(){
	window.requestAnimationFrame(animate);
	
	ctx.clearRect(0,0,W,H);
	
	if(circle.length<10){
		var x= mouse.x;
		var y= mouse.y;
		var r= Math.random()*20 + 5;
		var dx= (Math.random()-0.5)*8;
		var dy= (Math.random()-0.5)*8;
		circle.push(new Circle(x,y,r,dx,dy));
	}
	
	
	for(var i=circle.length-1;i>=0;i--){
		if(circle[i].r<=0)
			circle.splice(i,1);
		circle[i].update();
	}
}