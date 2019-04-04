

// 3° OBJECTS OF THE SCENE

//Declare the objects that you want to initialize
//let videoTracking;
let test;
let test2;

//let noseX = window.innerWidth/2;
//let noseY =  window.innerHeight/2;



function setup() {


  //set up the main canvas OVER the webcam
  createCanvas(windowWidth, windowHeight);



  // tracking

  //videoTracking = createCapture(VIDEO);
  //videoTracking.size(windowWidth, windowHeight);
  //videoTracking.hide();

  //poseNet = ml5.poseNet(videoTracking, modelReady);
  //poseNet.on("pose", gotPoses);




  // Create objects

  test = new canvasCircle();
  test2 = new canvasLine();
  setInterval(function(){ clear(); }, 60000);


}



//function gotPoses(poses){
  if(poses.length>0){


    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;



}

}

//function modelReady(){
  console.log("model ready!");
}





function draw() {


  //image(videoTracking,0,0);
  // START DRAWING
  test2.display();

  fill(255,0,0);
  ellipse(noseX,noseY, 30);

}
