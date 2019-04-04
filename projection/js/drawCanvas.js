
class canvasCircle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 55;
    this.hue = 0;
    this.history = [];
  }

  display(){
    this.hue = this.hue + 1;
    if(this.hue>=360){this.hue=0;}
    colorMode(HSB);
    fill(this.hue, 204, 100);
    noStroke();
    if (mouseIsPressed){
    ellipse(mouseX, mouseY, this.diameter, this.diameter);}


  }



}

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

// Painter class
/*
class Painter {
  constructor() {
    this.tail = [];
    this.hue = random(0, 360);
    this.weight = random(10, 60);
    this.xpos = null;
    this.ypos = null;

  }

  display() {
    this.hue = this.hue + 1;
    if(this.hue>=360){hue=0;}
    colorMode(HSB);
    strokeWeight(this.weight);
    stroke(this.hue, 204, 100);


    this.tail.forEach((el, index) => {
      const next = tail[index + 1];
      if(next) {
        //ellipse(el.x, el.y, 10, 10);
        line(el.x, el.y, next.x, next.y);
      }
    })


  }

  move(posX, posY,) {
    posX = this.xpos;
    posY = this.ypos;

// outside or inside?
    function mouseDragged() {
        this.tail.push({ x: this.xpos, y: this.ypos; });
    }
  }

}
*/
