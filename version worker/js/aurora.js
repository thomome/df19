//°° VARIABLES °°//
let mouse = {
  x: 30,
  y: 30,
};

var Auroracanvas = null;
var ctx = null;
//var fps = [];
//var last = Date.now();


onmessage = function(evt) {
  if(evt.data.type === 'init') {
    Auroracanvas = evt.data.Auroracanvas;
    ctx = Auroracanvas.getContext("2d");
    loop();


    // at the moment is mapped with click
  } else {
    console.log('clicked');
  }
};



//°° EVENT LISTENER °°//

addEventListener("mousemove", function(event){
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});




function loop() {
  //var now = Date.now();
  ctx.clearRect(0, 0, 600, 800);



  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
  ctx.lineWidth = 5;
  ctx.fillStyle = "#ff9523";
  ctx.fill();
  //for(var i = 0; i < 10000; i++) {
//    ctx.rect(Math.random()*600, Math.random() * 350, 2, 2);
  //}
  ctx.fill();
  //fps.unshift(1000 / (now - last));
  //fps.splice(50);
  //var fp = Math.round(fps.reduce((accumulator, currentValue) => accumulator + currentValue) / 50)
  //ctx.fillText(fp, 0, 370);
  //last = now;
  requestAnimationFrame(loop);
};

/*
class AuroraBrush {

  constructor(x,y){
    this.x =x;
    this.y=y;
    this.img = loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2484857/aurora4.png');
    this.graphic = createGraphics(width, height);
    this.tail=[];

  }

  show(){

    this.tail.forEach((p, i) => {

      const offset = noise(i + Date.now() * 0.0003) * 555 + 10;
      const offset2 = noise(i + Date.now() * 0.001) * 20 + 50;
      const offset3 = (noise(i + Date.now() * 0.0002) - 0.5) * 50;
      image(this.img, p[0] - offset2 / 20, p[1] - offset + offset3, offset2, offset);
    })

  }


  update(){

      this.tail.push([this.x, this.y]);

      if (this.tail.length>50){this.tail.splice(0,1);}

}



} // end class

class canvasLine {
  constructor(x,y,r,lastX,lastY) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.lastX = lastX;
    this.lastY = lastY;
    this.hue = 0;

  }

  display(){

    this.hue = this.hue + 1;
    if(this.hue>=360){this.hue=0;}
    colorMode(HSB);

    beginShape();
    stroke(this.hue, 204, 100);
    strokeWeight(this.r);

    line( this.x, this.y, this.lastX, this.lastY);


  }



}
*/
