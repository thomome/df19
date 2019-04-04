// 1°   Video settings to pass: Prefer camera resolution nearest to 1280x720.

var constraints = { audio: false, video: { width: 800, height: 600 } };

// 2°   GET THE STREAM

navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
  var video = document.querySelector("video");
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
    onPlayVideo();
  };
});


// CANVAS

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

function CanvasCircle(x,y,dx,dy,radius,color) {
  this.x = x;
  this.y = y;
  this.dx= dx;
  this.dy= dy;
  this.radius = radius;
  this.color = color;

  this.draw = function() {

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0,  Math.PI * 2, false);
    c.lineWidth = 5;
    c.fillStyle = this.color;
    c.fill();

  }

  this.update = function () {
      if (this.x + this.radius > canvas.width){ this.dx = -this.dx}
      if (this.x - this.radius < 0){ this.dx = -this.dx}
       // logica per verticale
      if (this.y + this.radius > canvas.height){ this.dy = -this.dy}
      if (this.y - this.radius < 0){ this.dy = -this.dy}
      this.x += this.dx;
      this.y += this.dy;

      this.draw();
  }

};


// TRACKER

var colors = new tracking.ColorTracker(["yellow"]);
let rec = document.querySelector(".rect");

colors.on("track", function(event) {
  if (event.data.length === 0) {
    rec.style.backgroundColor = "red";
    rec.style.top = "10px";
  } else {
    event.data.forEach(function(rect) {
      //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
      rec.style.backgroundColor = "yellow";
      let posY = rect.y;
      console.log(posY);
      rec.style.top = posY + "px";
      rec.style.left = rect.x + "px";
    });
  }
});

tracking.track("#myVideo", colors);
