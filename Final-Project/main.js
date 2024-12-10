import * as THREE from 'three';
import { AnimationMixer, AnimationClip } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
loader.load('model/humanoid.glb', function (gltf) {
    scene.add(gltf.scene);
    const humanoid = gltf.scene.getObjectByName('Humanoid');
    const armature = gltf.scene.getObjectByName('Armature');
    armature.position.set(0,0,0);
    armature.quaternion.setFromEuler(new THREE.Euler(2*Math.PI/4, 0*Math.PI/4, 0*Math.PI/4));
}, undefined, function (error) {
    console.error(error);
} );

const planeGeometry = new THREE.PlaneGeometry(400, 400);
const planeMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

const cubeTexture1 = new THREE.TextureLoader().load(['./textures/die1.png']);
const cubeTexture2 = new THREE.TextureLoader().load(['./textures/die2.png']);
const cubeTexture3 = new THREE.TextureLoader().load(['./textures/die3.png']);
const cubeTexture4 = new THREE.TextureLoader().load(['./textures/die4.png']);
const cubeTexture5 = new THREE.TextureLoader().load(['./textures/die5.png']);
const cubeTexture6 = new THREE.TextureLoader().load(['./textures/die6.png']);
const cubeMaterial1 = new THREE.MeshStandardMaterial({color:0xffffff, map:cubeTexture1});
const cubeMaterial2 = new THREE.MeshStandardMaterial({color:0xffffff, map:cubeTexture2});
const cubeMaterial3 = new THREE.MeshStandardMaterial({color:0xffffff, map:cubeTexture3});
const cubeMaterial4 = new THREE.MeshStandardMaterial({color:0xffffff, map:cubeTexture4});
const cubeMaterial5 = new THREE.MeshStandardMaterial({color:0xffffff, map:cubeTexture5});
const cubeMaterial6 = new THREE.MeshStandardMaterial({color:0xffffff, map:cubeTexture6});
const cubeMaterials = [cubeMaterial1, cubeMaterial2, cubeMaterial3, cubeMaterial4, cubeMaterial5, cubeMaterial6];
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
scene.add(cube);
cube.position.set(1, 1, 1);

const ballLoader = new THREE.TextureLoader();
const ballTexture = ballLoader.load('./textures/happy_face.png');
const ballMaterial = new THREE.MeshStandardMaterial({color:0xffff00, map:ballTexture});
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball)
ball.position.set(-3, 1, 0.5);

const camera = new THREE.PerspectiveCamera(75, 16/9, 0.01, 100);
camera.position.set(0, -10, 4);
camera.lookAt(0,0,0);

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(10,-10,-10);
scene.add(light);

let keysPressed = {};
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", function(event) {
  delete keysPressed[event.which];
});
function onDocumentKeyDown(event) {
  keysPressed[event.which] = true;
  if(keysPressed[17]) {
    if(keysPressed[98]) {
      camera.rotateX(-Math.PI/36);
    } else if(keysPressed[100]) {
      camera.rotateY(-Math.PI/36);
    } else if(keysPressed[102]) {
      camera.rotateY(Math.PI/36);
    } else if(keysPressed[104]) {
      camera.rotateX(Math.PI/36);
    }
  } else if(keysPressed[37] && keysPressed[38]) {
  } else if(keysPressed[39] && keysPressed[38]) {
  } else if(keysPressed[37]) {
  } else if(keysPressed[38]) {
  } else if(keysPressed[39]) {
  } else {
    if(keysPressed[98]) {
      camera.translateY(-0.05);
    } else if(keysPressed[100]) {
      camera.translateX(-0.05);
    } else if(keysPressed[102]) {
      camera.translateX(0.05);
    } else if(keysPressed[104]) {
      camera.translateY(0.05);
    } else if(keysPressed[107]) {
      camera.translateZ(0.05);
    } else if(keysPressed[109]) {
      camera.translateZ(-0.05);
    }
  }
}

function animate() {
  renderer.render( scene, camera );
  renderer.physicallyCorrectLights = true; 
}
renderer.setAnimationLoop( animate );

