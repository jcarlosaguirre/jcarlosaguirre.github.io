let scene, camera, renderer, loader, raycaster, animate, controls;

let pointer = {
  x: 0,
  y: 0
}

let interval, currentCard;
let objects = [];

// Get DOM element
const canvas = document.getElementById("threecontainer");
      

function init(){

  // Create scene and camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff0000);
  scene.add( new THREE.GridHelper(50, 50, 0x000000, 0xffffff) );

  camera = new THREE.PerspectiveCamera( 75, canvas.offsetWidth / canvas.offsetHeight, 1, 1000 );
  camera.position.set( 15, 13, 15);
  camera.rotation.set( 0, 0, 0);

  console.log( camera );


  // Renderer draws the scene. Append it to the DOM element
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
  canvas.appendChild( renderer.domElement );
  
  controls = new THREE.OrbitControls(camera, renderer.domElement)

  // Create cubes and add them to scene
  loader = new THREE.TextureLoader();

  const textures = [
    'assets/icons/js_original.png',
    'assets/icons/vue_original.png',
    'assets/icons/Angular_original.png',
    'assets/icons/node_original.png',
    'assets/icons/docker-icon.png',
    'assets/icons/php_original.png',
    'assets/icons/java-icon.png',
  ]

  let i = 0;
  let item = 0;

  textures.forEach(element => {
    
    let materials = [
      new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, color: 0xffffff, side: THREE.DoubleSide }), //right side
      new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, color: 0xffffff, side: THREE.DoubleSide }), //left side
      new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, color: 0xffffff, side: THREE.DoubleSide }), //top side
      new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, color: 0xffffff, side: THREE.DoubleSide }), //bottom side
      new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, map: loader.load(element), side: THREE.DoubleSide }), //front side
      new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, map: loader.load(element), side: THREE.DoubleSide }), //back side
    ];

    let geometry = new THREE.BoxGeometry(5, 5, 1);
    // const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 , shininess: 100 } );
    let cube = new THREE.Mesh( geometry, materials );
    
    switch (item) {
      case 0:
        cube.position.set( .5, 2.5, 3.5 );
        cube.rotation.y = 4.7
        cube.type = "H"
        break;
      case 1:
        cube.position.set( .5, 2.5, 8.5 );
        cube.rotation.y = 4.7
        cube.type = "H"
        break;
      case 2:
        cube.position.set( .5, 2.5, 13.5 );
        cube.rotation.y = 4.7
        cube.type = "H"
        break;
      case 3:
        cube.position.set( 3.5, 2.5, .5 );
        cube.rotation.y = 0
        cube.type = "V"
        break;
      case 4:
        cube.position.set( 8.5, 2.5, .5 );
        cube.rotation.y = 0
        cube.type = "V"
        break;
      case 5:
        cube.position.set( 13.5, 2.5, .5 );
        cube.rotation.y = 0
        cube.type = "V"
        break;
      default:
        cube.position.set( 3.5, 0, 3.5 );
        cube.rotation.y = 0;
        cube.rotation.x = 1.57;
        cube.rotation.z = 1.57;
        
        cube.type = "V"

    }
    

    scene.add( cube );

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set(50, 70, 50 ).normalize();
    scene.add(light);

    objects.push( cube )

    console.log( i );

    i -= 1.2;
    item++;
    
  });
  

  raycaster = new THREE.Raycaster();

  animate = function () {
      requestAnimationFrame( animate );


      renderer.render( scene, camera );
  };

}

init();
animate();

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

          // intersects[0].object.rotation.y += .05;

          console.log( intersects[0].object );

          rotateCard( intersects[0].object )
          
      }
  }

})

    
// Update renderer to fit new window size
window.addEventListener('resize', () => {
  
  if( window.innerWidth > 576 ){

    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(
      canvas.offsetWidth,
      canvas.offsetHeight
    );
  }
  else{

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }

}, false);


function rotateCard( mesh ){

  // If there is a card spinning
  if( currentCard ){

    // If new mesh is not the current one spinning
    if( currentCard != mesh ) {

      // Reset its position
      // if(currentCard.type == "H") 
      let interval = setInterval( () => {
        currentCard.position.y -= .02;
        if( currentCard.position.y < 2.5 ) clearInterval( interval )
      }, 2)
      currentCard.position.y = 2.5;
      // else currentCard.position.y = 0;
    }
  } 

  if( currentCard != mesh ) {

    // Reset its position
    clearInterval( interval )
    currentCard = mesh;
  
    interval = setInterval( () => {
      currentCard.position.y += .02;
      if( currentCard.position.y > 3.5 ) clearInterval( interval )
    }, 2)
  }


  
}