


// LOAD IMAGE

let img = new Image();
img.src =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2484857/direction%20sprite.png";
img.onload = function() {
  window.requestAnimationFrame(gameLoop);
};

// CALL CANVAS

var canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
let ctx = canvas.getContext("2d");

// CONST VARIABLES

const WIDTH = 46;
const HEIGHT = 46;

// DRAW FRAME

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX * WIDTH,
    frameY * HEIGHT,
    WIDTH,
    HEIGHT,
    canvasX,
    canvasY,
    WIDTH,
    HEIGHT
  );
}

// CONST CYCLE LOOP

const CYCLE_LOOP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentLoopIndex = 0;
let frameCount = 0;
const FRAME_LIMIT = 4;

const MOVEMENT_SPEED = 2;
let positionX = 0;
let positionY = 0;

const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
let currentDirection = FACING_DOWN;




// USER INPUT EVENTS

let keyPresses = {};

window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}

window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}


var dir;

  client.on('message', function(topic, message) {
    console.log('new message:', topic, message.toString());
    if (message.toString() === "up"){ dir = "up";}
    if (message.toString() === "down"){dir = "down";}
    if (message.toString() === "left"){dir = "left"}
    if (message.toString() === "right"){dir = "right"}
    if (message.toString() === "stop"){dir = ""}
  });




// GAME LOOP FUNCTION

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let hasMoved = false;


if (keyPresses.w || dir === "up") {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (keyPresses.s || dir === "down") {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }

  if (keyPresses.a || dir === "left") {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (keyPresses.d || dir === "right") {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }
  if (!hasMoved) {
    currentLoopIndex = 0;
}


  drawFrame(
    CYCLE_LOOP[currentLoopIndex],
    currentDirection,
    positionX,
    positionY
  );

  window.requestAnimationFrame(gameLoop);
}

function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  currentDirection = direction;
}


/*
positionX += deltaX
positionY += deltaY

if(positionX < 0) {
  positionX = 0;
}
if(positionX + WIDTH > canvas.width) {
  positionX = canvas.width - WIDTH
}*/
