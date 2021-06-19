var objects = [];


// Get DOM element
const canvas = document.getElementById("threecontainer");
      
// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000 );


// Renderer draws the scene. Append it to the DOM element
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
canvas.appendChild( renderer.domElement );

// Create cube and add it to scene

const loader = new THREE.TextureLoader();

const textures = [
  'assets/icons/js_original.png',
  'assets/icons/vue_original.png',
  'assets/icons/Angular_original.png',
  'assets/icons/node_original.png',
  'assets/icons/java-icon.png',
  'assets/icons/php_original.png',
  'assets/icons/docker_original.png'
]

let i = 0;

textures.forEach(element => {
  
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), //left side
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), //top side
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), //bottom side
    new THREE.MeshBasicMaterial({ map: loader.load(element), side: THREE.DoubleSide }), //front side
    new THREE.MeshBasicMaterial({ map: loader.load(element), side: THREE.DoubleSide }), //back side
  ];

  var faceMaterial = new THREE.MeshFaceMaterial( materials );

  const geometry = new THREE.BoxGeometry(1, 1, .2);
  // const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 , shininess: 100 } );
  const cube = new THREE.Mesh( geometry, faceMaterial );
  cube.position.set( i, 0, 1)
  scene.add( cube );

  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 1 ).normalize();
  scene.add(light);

  objects.push( cube )

  console.log( i );

  i += .5;
  
});

camera.position.z = 5;


const raycaster = new THREE.Raycaster();

const animate = function () {
    requestAnimationFrame( animate );


    renderer.render( scene, camera );
};

animate();


var pointer = {
    x: 0,
    y: 0
}

// Update pointer position and interactions with meshes
document.addEventListener("pointermove", ( event, bool = false ) => {
    

    // Get area of canvas (where scene is draw)
    var area = renderer.domElement.getBoundingClientRect();
    var canvasLeft = area.left;   // Margin of canvas
    var canvasWidth = area.width  // Width of canvas

    if( !bool ){

      if( window.innerWidth > 1600 ){

        canvasWidth = 1600;
      }
      
        
      pointer.x = ( ( event.clientX - canvasLeft ) / canvasWidth ) * 2 - 1;
      pointer.y = - ( ( event.clientY - area.top ) / ( area.bottom - area.top) ) * 2 + 1;

    }
    else{
      pointer.x = ( ( event.targetTouches[0].clientX - area.left ) / ( area.width - area.left ) ) * 2 - 1;
      pointer.y = - ( ( event.targetTouches[0].clientY - area.top ) / ( area.bottom - area.top) ) * 2 + 1;
    }

    // If click position is inside the canvas
    if  (( pointer.x < 1 && pointer.x > -1 ) &&
        ( pointer.y < 1 && pointer.y > -1 )) {
    
      // console.log( pointer );

      // Scan its position
      raycaster.setFromCamera( pointer, camera );

      // Get intersected mesh
      const intersects = raycaster.intersectObjects( objects, true );

      if( intersects[0] != undefined ){

          /* if( intersects[0].object.material.color.r == 1 ) intersects[0].object.material.color.setHex(0x00ff00)
          else intersects[0].object.material.color.setHex(0xff0000) */

          intersects[0].object.rotation.y += .05;

          console.log( intersects[0].object );
          
      }


    // If a mesh is selected and is active
    /* if ( intersects.length > 0 && intersects[ 0 ].object.isActive ) {

      console.log( intersects[ 0 ].object );

      // And all meshes selected is true
      if( this.seleccionaTodo ){

        // Deselect every mesh
        while( this.selectedItem.length > 0){

          this.unSelectObject()
        }
      }

      console.log( intersects );

      // Then add the selected mesh to array
      this.addObjeto( intersects[ 0 ].object )
    }

    // If there is no mesh selected
    else if(intersects.length == 0 && this.selectedItem.length > 0){
      
      console.log( intersectsPosition[0].point );

      this.moveElements( intersectsPosition[0].point );

    } */
  }

})

    
// Update renderer to fit new window size
window.addEventListener('resize', () => {
  
  camera.aspect = canvas.offsetWidth / canvas.offsetHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(
    canvas.offsetWidth,
    canvas.offsetHeight
  );

}, false);