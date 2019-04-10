
importScripts('simplenoise.js');


//°° VARIABLES °°//
let mouse = {
  x: 30,
  y: 30,
};

let canvas;
let ctx;
let img;
let w;
let h;
let index = 0;
const pts = [];

const simplex = new SimplexNoise();


onmessage = function(evt) {
  if(evt.data.type === 'init') {
    canvas = evt.data.canvas;
    ctx = canvas.getContext("2d");
    // sets here that the image comes from the data sent
    img = evt.data.img;
    w = img.width;
    h = img.height * 2;
    loop();

  } else if(evt.data.type === 'track'){
    //takes from the objects' rect properties the first object
    const left = evt.data.rects[0].rect.left;
    const top = evt.data.rects[0].rect.top;
    //pushes them into an array
    if(pts[0]) {
      const points = getInterpolationPts(pts[0], [left, top], 10);
      for(let i = 0; i < points.length; i++) {
        const p = points[i];
        pts.unshift([ p[0], p[1], index ]);
        index++;
      }
    }
    pts.unshift([left, top, index]);
    index++;
    pts.splice(600);
  }
};

function getInterpolationPts(p1, p2, maxDist) {
  const deltaX = p1[0] - p2[0];
  const deltaY = p1[1] - p2[1];
  const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const numberOfPoints = Math.floor(dist / maxDist);
  const points = [];
  for(let i = 0; i < numberOfPoints; i++) {
    const addX = deltaX / numberOfPoints * i;
    const addY = deltaY / numberOfPoints * i;
    points.push([ p1[0] + addX, p1[1] + addY ])
  }
  return points;
}

function loop() {
  ctx.canvas.width = ctx.canvas.width;

  for(let i = 0; i < pts.length; i++) {

    const p = pts[i];
    const index = p[2];
    const x = p[0];
    const y = p[1];

    const t = index * 0.02 + Date.now() * 0.0002;
    let hh = (simplex.noise2D(t,260) + 1) * (h - 200) + 200;
    let yy = y + simplex.noise2D(t,10) * 20 - (hh / 2);
    let ww = w; //(simplex.noise2D(t,300) + 1) * w + w;
    let xx = x + simplex.noise2D(t,1) * 10 - (ww / 2);


    ctx.drawImage(img, xx, yy, ww, hh);
  }


  requestAnimationFrame(loop);
};
