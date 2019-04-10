

importScripts('simplenoise.js');

let canvas;
let ctx;
const pts = [];
let brush;
let grd;
let index = 0;

onmessage = function(evt) {
  if(evt.data.type === 'init') {
    canvas = evt.data.canvas;
    ctx = canvas.getContext("2d");
    // sets here that the image comes from the data sent

    grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, "#FDC82E");
    grd.addColorStop(0.25, "#FC361E");
    grd.addColorStop(0.5, "#F1279F");
    grd.addColorStop(0.75, "#32D1FB");
    grd.addColorStop(1, "#1227FB");

    loop();

  } else if(evt.data.type === 'track'){
    //takes from the objects' rect properties the first object
    const left = evt.data.rects[0].rect.left;
    const top = evt.data.rects[0].rect.top;
    //pushes them into an array
    pts.unshift([left, top, index]);
    pts.splice(80);
    index++;
  }
};


  let posgrd = 0;
  let dir = 5;

  const simplex = new SimplexNoise();


function loop() {

  /*posgrd+=dir;
  if (posgrd > canvas.width || posgrd < 0){ dir *=-1;}
  var grd = ctx.createLinearGradient(posgrd, posgrd, canvas.width, canvas.height);
  grd.addColorStop(0, "#FDC82E");
  grd.addColorStop(0.25, "#FC361E");
  grd.addColorStop(0.5, "#F1279F");
  grd.addColorStop(0.75, "#32D1FB");
  grd.addColorStop(1, "#1227FB");
*/
let t = Date.now() * 0.0002;

  ctx.canvas.width = ctx.canvas.width;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = grd;


  for(let i = 0; i < pts.length -1; i++) {


    const p = pts[i];
    const n = pts[i + 1];
    const noise = (simplex.noise2D(0, p[2] * 0.08))*20 + 20;

    ctx.beginPath();
    ctx.moveTo(n[0], n[1])
    ctx.lineTo(p[0], p[1], n[0], n[1])
    //ctx.arc(p[0],p[1],radius,0,Math.PI*2);
    ctx.lineWidth = noise;
ctx.stroke();

  }


  requestAnimationFrame(loop);
};
