importScripts("three.min.js");

let canvas;

onmessage = function(evt) {
  if(evt.data.type === 'init') {
    canvas = evt.data.canvas;

    init();

  }

  else if(evt.data.type === 'track'){
    const rect = evt.data.rects[0].rect;

    //takes from the objects' rect properties the first object
    const x = rect.left;
    const y = rect.top;
      }


}; // end on message




var camera, scene, renderer;
var geometry, material, mesh;



function init() {

	camera = new THREE.PerspectiveCamera( 45, 1280 / 720, 0.001, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

  renderer = new THREE.WebGLRenderer( { canvas: canvas, alpha:true, antialias: true } );

  animate();
}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}
