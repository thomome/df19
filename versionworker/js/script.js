// Init the canvas and workers

const effects = {
  'aurora': {
    worker: null,
    offscreen: null,
    color: {
      name: 'yellow',
      threshold: 50,
      color: [191, 153, 37]
    },
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
    color: {
      name: 'magenta',
      threshold: 50,
      color: [184, 89, 119]
    },
    init: (effect) => {
          effect.worker.postMessage({
              canvas: effect.offscreen,
              type: 'init'
          }, [effect.offscreen]);
      } // end init function
},
  'stars': {
  worker: null,
  offscreen: null,
  color: {
    name: 'blue',
    threshold: 50,
    color: [64, 126, 174]
  },
  init: (effect) => {
        effect.worker.postMessage({
            canvas: effect.offscreen,
            type: 'init'
        }, [effect.offscreen]);
    } // end init function
}/*,
  'astronaut': {
worker: null,
offscreen: null,
init: (effect) => {
      effect.worker.postMessage({

          // set the size for threejs

          // should I repeat this?
          canvas: effect.offscreen,
          type: 'init',

          // effect.offscreen.style = {width : 0, height : 0},
          // where do you fire these functions?
          //renderer = new THREE.WebGLRenderer( { antialias: true, canvas: effect.offscreen } );
          //renderer.setSize( canvas.width, canvas.height );

      }, [effect.offscreen]);
  } // end init function
},*/
}; // end const effects



// 2°   GET THE STREAM
var streamOptions = {
  audio: false,
  video: {
    width: 1280,
    height: 720,
    frameRate: {
      ideal: 60,
      min: 30
    }
  }
};

const video = document.querySelector("video");
navigator.mediaDevices.getUserMedia(streamOptions).then(function(mediaStream) {
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
    onPlayVideo();
    initTracker();
  };
});



function initTracker() {

  // init color tracker and connect to video
  const tracker = new ColorTracker(video, {
    fps: 60,
    resolution: 100
  });

  for(let effect in effects) {
    const canvas = document.createElement('canvas');
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.id = effect;
    canvas.className = 'effect';
    document.body.appendChild(canvas);

    effects[effect].offscreen = canvas.transferControlToOffscreen();
    effects[effect].worker = new Worker(`js/worker_${effect}.js`);
    effects[effect].init(effects[effect])

    if(effects[effect].color) {
      tracker.addColor(effects[effect].color);
    }
  }
	tracker.run();

  // listener from worker
	tracker.on('track', (rects) => {

    // the result of the array is passed through the property rects?
    for(let effect in effects) {
      if(effects[effect].color) {
        const filteredRects = rects.filter((rect) => rect.color === effects[effect].color.name);
        if(filteredRects.length > 0) {
          effects[effect].worker.postMessage({ rects: filteredRects, type: 'track' })
        }
      }
    }

	});
}


  var app = new PIXI.Application( window.innerWidth,window.innerHeight, {
    transparent: true,
    autoResize: true,
    resolution: devicePixelRatio
  });
  document.body.appendChild(app.view);
  app.view.id = 'duotone';
  // resize window: onResize , "window.addEventListener("resize", resizeMe); "
  app.renderer.autoResize = true;


  function onPlayVideo() {

    // create a video texture from a path
    var base = PIXI.VideoBaseTexture.fromVideo(document.querySelector("video"));
    var texture = PIXI.Texture.from(base);

    // create a new Sprite using the video texture (yes it's that easy)
    var videoSprite = new PIXI.Sprite(texture);

    // Stetch the fullscreen
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    app.stage.addChild(videoSprite);

    // 5°  Filters

    // takes 2 colors and creates the matrix
    function convertToDueTone(color1, color2) {
      //var color1 = hsl2rgb(hslColor1);
      //var color2 = hsl2rgb(hslColor2);

      var matrix = [];
      matrix = matrix.concat([
        color1[0] / 256 - color2[0] / 256,
        0,
        0,
        0,
        color2[0] / 256
      ]);

      matrix = matrix.concat([
        color1[1] / 256 - color2[1] / 256,
        0,
        0,
        0,
        color2[1] / 256
      ]);

      matrix = matrix.concat([
        color1[2] / 256 - color2[2] / 256,
        0,
        0,
        0,
        color2[2] / 256
      ]);

      matrix = matrix.concat([0, 0, 0, 1, 0]);
      return matrix;
    }

    // Duotones gradient wheel & apply filter
    var duotone = new PIXI.filters.ColorMatrixFilter();
    videoSprite.filters = [duotone];

    // 6°   Event Listeners
    window.addEventListener('resize', function(){


      app.renderer.resize(window.innerWidth, window.innerHeight);
      videoSprite.width = app.screen.width;
      videoSprite.height = app.screen.height;
  })


    document.addEventListener("keyup", function(event) {
      // older browsers might use keyCode instead of key
      var key = event.key || event.keyCode;
      // put all possible fallback
      if (key === "2" || key === "Digit2" || key === 50) {

        target1 = [243, 82, 13];
        target2 = [31, 45, 3];
      }
    });



    var circleIndex = 0;
    var circle = [
      {
        lightTone: [0, 193, 251],
        darkTone: [104, 40, 227]
      },

      {
        lightTone: [243, 82, 113],
        darkTone: [31, 45, 93]
      },

      {
        lightTone: [99,255, 121],
        darkTone: [0, 4, 131]
      },

      {
        lightTone: [217,98, 107],
        darkTone: [67, 53, 166]
      },

      {
        lightTone: [255,193, 66],
        darkTone: [246, 0, 171]
      },

      {
        lightTone: [133,230,244],
        darkTone: [214,2,45]
      }


    ]


    var target1 = circle[circleIndex].lightTone
    var target2 = circle[circleIndex].darkTone

    var current1 = target1;
    var current2 = target2;

    var stepSize = 0.02;

    app.ticker.add(function(delta) {

      if( Math.round( current1[0] - target1[0] ) !== 0 ) {

        current1 = [
          ( target1[0] - current1[0] ) * stepSize + current1[0],
          ( target1[1] - current1[1] ) * stepSize + current1[1],
          ( target1[2] - current1[2] ) * stepSize + current1[2]
        ]

        current2 = [
          ( target2[0] - current2[0] ) * stepSize + current2[0],
          ( target2[1] - current2[1] ) * stepSize + current2[1],
          ( target2[2] - current2[2] ) * stepSize + current2[2]
        ]

        /*

      for (var i = 0; 1 < current1.length; i++) {
       target1[i] - current1[i] ) * stepSize + current1[i];
        return [];.. I DON?T KNOWWW
      }


        */

      } else {

        circleIndex++;

        if(circleIndex > circle.length -1) {
          circleIndex = 0;
        }

        target1 = circle[circleIndex].lightTone
        target2 = circle[circleIndex].darkTone
      }

      var matrix = convertToDueTone(current1, current2);
      duotone._loadMatrix(matrix);
    });
  }
