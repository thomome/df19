# Native Canvas

## Aurora Brush

Load Image

```javascript
let img = new Image();
img.src =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2484857/direction%20sprite.png";
img.onload = function() {
  window.requestAnimationFrame(gameLoop);
};
```

Call the canvas

```javascript
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
```

# Web workers

 Web Workers allow you to do things like fire up long-running scripts to handle computationally intensive tasks, but without blocking the UI or other scripts to handle user interactions.

1) create a canvas and send them to off screen
```javascript
const offscreen = canvas.transferControlToOffscreen();
```

2) create a worker
```javascript
var worker = new Worker('task.js');
```

3) After creating the worker, start it by calling the postMessage() method:

```javascript
worker.postMessage(); // Start the worker.
```

4) The magic of workers happens via the __postMessage()__ method and the __onmessage__ event handler. When you want to send a message to the worker, you post messages to it like this (main.js):
passing an image to a workers
```javascript
first.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
```
In the worker, we can respond when the message is received by writing an __event handler__ block
```javascript
onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
```

Back in the __main thread__, we use __onmessage__ again, to respond to the message sent back from the worker:
```javascript
myWorker.onmessage = function(e) {
  result.textContent = e.data;
  console.log('Message received from worker');
}
```

Worker threads have access to a global function, importScripts(), which lets them import scripts.

```javascript
importScripts();                         /* imports nothing */
importScripts('foo.js');                 /* imports just "foo.js" */
importScripts('foo.js', 'bar.js');       /* imports two scripts */
importScripts('//example.com/hello.js'); /* You can import scripts from other origins */
```

## Passing Pictures into Workers

create image in the DOM
```javascript
const img = document.createElement('img');
```
create event listener once it loads
```javascript

img.addEventListener('load', () => {
    createImageBitmap(img).then((bitmap) => {
        worker.postMessage({
            img: bitmap,
            canvas: offscreen,
            // specify the type to control the event
            type: 'init'
        }, [offscreen])
    });
})
// crossOrigin when the img is from an outside source: unsplash
img.crossOrigin = 'anonymous';
img.src = './assets/aurora4.png';
```
## Passing X,Y from tracking
Event listener for the positioning

```javascript
// EVENT LISTENER
window.addEventListener('mousemove', (e) => {
  const rect = {
    color: 'yellow',
    rect: {
      top: e.pageY,
      left: window.innerWidth - e.pageX,
      bottom: e.pageY,
      right: e.pageX
    }
  };
  // specify the type to track
  worker.postMessage({ rects: [rect], type: 'track' })
})
```

## Worker: Receiving stuff from the main script

declare the variables that you will receive

```javascript
let canvas;
let ctx;
let img;
const pts = [];
```

if statement to differentiate between the posted messages

```javascript
onmessage = function(evt) {
  if(evt.data.type === 'init') {
    canvas = evt.data.canvas;
    ctx = canvas.getContext("2d");
    img = evt.data.img;
    // once the data is loaded the loop/draw function is fired
    loop();

  } else if(evt.data.type === 'track'){
    const left = evt.data.rects[0].rect.left;
    const top = evt.data.rects[0].rect.top;
    //sends the points into the array pts
    pts.unshift([left, top]);
    pts.splice(200);
  }
};
```
load these data into the drawing script

```javascript
function loop() {

  for(let i = 0; i < pts.length; i++) {
    const p = pts[i]
    ctx.drawImage(img, p[0] - img.width / 2, p[1] - img.height / 2)
  }

  requestAnimationFrame(loop);
};

```


## Noise and Linear Interpolation

## Rainbow
