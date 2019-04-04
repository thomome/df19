// 1°   Video settings to pass: Prefer camera resolution nearest to 1280x720.

var constraints = { audio: false, video: { width: 800, height: 600 } };






// 2°   GET THE STREAM

const video = document.querySelector("video");

navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
    init();
  };
});







// VARIABLES



let mode = 'draw';
let lastX = 0;
let lastY = 0;

let x = 0;
let y = 0;
let r = 0;


let auroraBrush;


// init

function init() {
  onPlayVideo();

}

function setup(){


  createCanvas(windowWidth, windowHeight);

  const colors = new tracking.ColorTracker(["yellow", "magenta"]);
  colors.on("track", function(event) {
    if(event.data.length !== 0) {
      event.data.forEach(function(rect) {
        if(rect.color === 'yellow') {
          mode = 'draw';

        } else {
          mode = 'delete';
        }
        x = rect.x;
        y = rect.y;
        r = (rect.width + rect.height) / 4;

      });
    }
  });


  tracking.track(video, colors);
  auroraBrush = new AuroraBrush(300,300);

}


// draw

function draw() {
clear();


  if(mode === 'draw') {
    //use method parameters to push new position, maybe they need to be way smaller!!
    auroraBrush.show();
    auroraBrush.x=lastX;
    auroraBrush.y=lastY;
    auroraBrush.update();

  } else {
    clear(x, y, r, r);
  }

  lastX = x;
  lastY = y;

}
