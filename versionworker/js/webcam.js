// 1°   Video settings to pass: Prefer camera resolution nearest to 1280x720.

var constraints = {
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



// 2°   GET THE STREAM

const video = document.querySelector("video");

navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
    onPlayVideo();
  };
});



// 3°   PIXI JS init

var app = new PIXI.Application(window.innerWidth,window.innerHeight, { transparent: true, autoResize: true,
  resolution: devicePixelRatio});

document.body.appendChild(app.view);

// resize window: onResize , "window.addEventListener("resize", resizeMe); "
app.renderer.autoResize = true;





// 4°   Video is passed to Pixi via Texture

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



} // end on play function video


function interpolateColor(current, target) {

}
