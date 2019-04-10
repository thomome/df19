const effects = {
  'aurora': {
    worker: null,
    offscreen: null,
    init: (effect) => {
      const img = document.createElement('img');
      img.addEventListener('load', () => {
          createImageBitmap(img).then((bitmap) => {
              effect.worker.postMessage({
                  img: bitmap,
                  canvas: effect.offscreen,
                  type: 'init'
              }, [effect.offscreen])
          });
      })//event listener
      img.src = './assets/aurora4.png';
    }
  },
  'rainbow': {
    worker: null,
    offscreen: null,
    init: (effect) => {
          effect.worker.postMessage({
              canvas: effect.offscreen,
              type: 'init'
          }, [effect.offscreen]);
      } // end init function

  } // end rainbow
}; // end const effects


for(let effect in effects) {
  const canvas = document.createElement('canvas');
  canvas.width =  window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  effects[effect].offscreen = canvas.transferControlToOffscreen();
  effects[effect].worker = new Worker(`js/worker_${effect}.js`);
  effects[effect].init(effects[effect])
}



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

  for(let effect in effects) {
    effects[effect].worker.postMessage({ rects: [rect], type: 'track' })
  }
})
