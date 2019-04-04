const arr = [];

for(let i = 0; i < 360; i++) {
  arr.push({
    from: { x: Math.sin(i * Math.PI / 200) * 10, y: Math.cos(i * Math.PI / 200) * 10 },
    to: { x: Math.sin((i + 1) * Math.PI / 200) * 10, y: Math.cos((i + 1) * Math.PI / 200) * 10 },
  })
}

var intersections = isect.bush(arr, {
  onFound(point, segments) {
    console.log(point);

    return true; // yes, stop right now!
  }
});

intersections.run();
