let upbut = document.getElementById("up");
let downbut = document.getElementById("down");
let leftbut = document.getElementById("left");
let rightbut = document.getElementById("right");
let stopbut = document.getElementById("stop");

// GYROSCOPE EVENT LISTENER

window.addEventListener("deviceorientation", function(e) {

  if (e.beta>15){
    activateButton([upbut]);
    if (e.gamma>15){activateButton([rightbut]);}
    if (e.gamma<-15){activateButton([leftbut]);}
}
else if (e.beta<-15) {
  activateButton([downbut]);
  if (e.gamma>15){activateButton([rightbut]);}
  if (e.gamma<-15){activateButton([leftbut]);}
}
else if (e.beta>-14 && e.beta<14){
  activateButton([stopbut]);
  if (e.gamma>15){activateButton([rightbut]);}
  if (e.gamma<-15){activateButton([leftbut]);}}


}, true);




var client = mqtt.connect('mqtts://ab65a55b:40255431bd510da5@broker.shiftr.io', {
  clientId: 'javascript'
});

client.on('connect', function(){


// USER INPUT EVENTS

document.getElementById("up").addEventListener("click", function(){

  client.publish('/direction', 'up');
});
document.getElementById("down").addEventListener("click", function(){
  client.publish("/direction", 'down');
});
document.getElementById("left").addEventListener("click", function(){
  client.publish("/direction", 'left');
});
document.getElementById("right").addEventListener("click", function(){
  client.publish("/direction", 'right');
});
document.getElementById("stop").addEventListener("click", function(){
  client.publish("/direction", 'stop');
});
});  // client on

var activateButton = function(elements){

  let removeactiveButtons = document.querySelectorAll(".test");
  removeactiveButtons.forEach(function(el) {
    el.classList.remove("test");
  });


  elements.forEach(function(el){
    el.classList.add("test");
  });
};
