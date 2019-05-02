importScripts('simplenoise.js');

let canvas;
let ctx;
const pts = [];
let brush;
let grd;
let pat;
let index = 0;
let pos = [];

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

		pat = ctx.createPattern(evt.data.img, "no-repeat");

    loop();

  } else if(evt.data.type === 'track'){
    //takes from the objects' rect properties the first object
    const left = evt.data.rects[0].rect.left;
    const top = evt.data.rects[0].rect.top;
    pos[0] = left;
    pos[1] = top;
    pos[2] = index + 1;

    let dist = Infinity;

    if(pts.length > 0) {
      const deltaX = left - pts[0][0];
      const deltaY = top - pts[0][1];
      dist = Math.sqrt( deltaX * deltaX + deltaY * deltaY );
    }
    if(dist > 100) {
      //pushes them into an array
      pts.unshift([left, top, index]);
      pts.splice(30);
      index++;
    }
  }
};

let posgrd = 0;
let dir = 5;

const simplex = new SimplexNoise();


function loop() {
  ctx.canvas.width = ctx.canvas.width;

	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = pat;

  const pts2 = pts.slice(0);
  pts2.unshift(pos);

  const t = Date.now() * 0.0002;

  for(let i = 0; i < pts2.length -1; i++) {
    const index = pts2[i][2];

    const noise = (simplex.noise2D(0, index * 0.08))*6 + 30;
    const noiseX = (simplex.noise2D(0, t * index * 0.08)) * 0.1;
    const noiseY = (simplex.noise2D(20, t * index * 0.08)) * 0.1;

    const prev = pts2[i - 1];
    const cur1 = pts2[i];
    const cur2 = pts2[i + 1];
    const next = pts2[i + 2];
    cur1[0] += noiseX;
    cur1[1] += noiseY;

    let hdl1;
    let hdl2;

    if(prev) {
      const vec1 = [ prev[0] - cur1[0], prev[1] - cur1[1] ];
      const vec2 = [ cur1[0] - cur2[0], cur1[1] - cur2[1] ];
      const vecAvg = [ (vec1[0] + vec2[0]) / 2, (vec1[1] + vec2[1]) / 2 ];
      const vec = [ vecAvg[0] / 2, vecAvg[1] / 2 ];
      hdl1 = [ cur1[0] - vec[0], cur1[1] - vec[1] ];
    } else {
      hdl1 = cur1;
    }

    if(next) {
      const vec1 = [ next[0] - cur2[0], next[1] - cur2[1] ];
      const vec2 = [ cur2[0] - cur1[0], cur2[1] - cur1[1] ];
      const vecAvg = [ (vec1[0] + vec2[0]) / 2, (vec1[1] + vec2[1]) / 2 ];
      const vec = [ vecAvg[0] / 2, vecAvg[1] / 2 ];
      hdl2 = [ cur2[0] - vec[0], cur2[1] - vec[1] ];
    } else {
      hdl2 = cur2;
    }

    ctx.beginPath();
    ctx.moveTo(cur1[0], cur1[1])
    ctx.bezierCurveTo(hdl1[0], hdl1[1], hdl2[0], hdl2[1],  cur2[0], cur2[1]);

    ctx.lineWidth = noise;
		ctx.stroke();
  }

  requestAnimationFrame(loop);
};
