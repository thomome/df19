importScripts('simplenoise.js');
const simplex = new SimplexNoise();

const particles = [];
let globalIndex = 0;


const lifeTime = 0.001;
const starSize = 10;
const distanceStars = 100;
const minDistanceStars = 70;

function add(x, y) {
  const t = Date.now() * 0.001;
  //const starNoise = (simplex.noise2D(0, t)) * 0.25;
  const starNoise = Math.floor(Math.random() * 8);
  const star = starSize - starNoise;
  particles.push({ x: x, y: y, s: star, i: globalIndex })
  globalIndex++;
}


onmessage = function(evt) {
  if(evt.data.type === 'init') {
    canvas = evt.data.canvas;
    ctx = canvas.getContext("2d");

    loop();

  }

  else if(evt.data.type === 'track'){
    const rect = evt.data.rects[0].rect;

    //takes from the objects' rect properties the first object
    const x = rect.left;
    const y = rect.top;

//  2° STEP: particles are created
    if(particles.length > 0) {

      // 2.1  get the latest particle
      const lastIndex = particles.length -1;
      const particle = particles[lastIndex];

      // 2.2 calculate distance
      const deltaX = x - particle.x;
      const deltaY = y - particle.y;
      const dist = Math.sqrt( deltaX * deltaX + deltaY * deltaY );

      // 2.3 push particles
      if(dist > minDistanceStars) {
        add(x, y);
      }

  } else {

    add(x, y);
    }

  }// end track

}; // end on message




// 3° - 4° STEP

function loop() {

  // 3.1 clear canvas
  ctx.canvas.width = ctx.canvas.width;

// 3.2 - 3.5 DRAWING ELLIPSES

// 3.2 styling


// 3.3 loop through all particles // for loop
  for(let i = 0; i < particles.length; i++){

    const p = particles[i];

// 3.4 Noise for particles movement

    const t = i * 0.02 + Date.now() * 0.0002;

// correct the noise as the example
    const xNoise = (simplex.noise2D(0, t * p.i *  0.0001)) * 0.25;
    const yNoise = (simplex.noise2D(20, t * p.i *  0.0001)) * 0.25;


    p.x += xNoise;
    p.y += yNoise;



// 3.5 Draw ellipse on canvas
    // p.x is particles[i].x
    // check p.s

    ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
    ctx.closePath();

    particles[i].x = p.x;
    particles[i].y = p.y;

 }

 ctx.fillStyle = 'white';
 ctx.fill();




// 4.1 - 4.5 DRAWING LINES

// 4.1 styling ! map function requires te result of weight and ma, but now it comes before them
  ctx.strokeStyle = "white";


// 4.2 link between stars, loop in a loop

const linkSums = {}

for(let i = 0; i < particles.length; i++) {

  const p1 = particles[i];

  // second loop, starts with the particles that comes after
  for(let j = i + 1; j < particles.length; j++) {

    const p2 = particles[j];


// 4.3 calculating distance

    const deltaX = p1.x - p2.x;
    const deltaY = p1.y - p2.y;

    const dist = Math.sqrt( deltaX * deltaX + deltaY * deltaY );


    if(dist < distanceStars) {

// 4.4 mapping the results

    // iterate linksum
    linkSums[i] = linkSums[i] ? linkSums[i] + 1 : 1;
    linkSums[j] = linkSums[j] ? linkSums[j] + 1 : 1;

    let weight = map(dist, minDistanceStars, distanceStars, 0.25, 1.5);

      ctx.beginPath();
      ctx.lineWidth = weight;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();


    }

  }
}



particles.forEach((p, i) => {
  if(!linkSums[i] || linkSums[i] < 2) {
    particles[i].s -= lifeTime;
    if(particles[i].s <= 0) {
      particles.splice(i, 1);
    }
  }
});

  requestAnimationFrame(loop);
};


function map(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
