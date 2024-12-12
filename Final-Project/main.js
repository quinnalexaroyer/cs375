import * as THREE from 'three';
import { AnimationMixer, AnimationClip } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const clock = new THREE.Clock();
const roothalf = 0.7071067811865476;

let humanoid;
let armature;
let mixer;
let clips;
let walkClip;
let walkAction;
let startWalkClip;
let startWalkAction;
let endWalkClip;
let endWalkAction;
let pickUpClip;
let pickUpAction;
let pickUpHoldClip;
let pickUpHoldAction;
let putDownClip;
let putDownAction;
let kickClip;
let kickAction;
let turnLeftClip;
let turnLeftAction;
let turnRightClip;
let turnRightAction;

var isHolding = false;
var direction = 0;

function d() {
  if(direction == 0) return [1,0];
  else if(direction == 1) return [roothalf, -roothalf];
  else if(direction == 2) return [0,-1];
  else if(direction == 3) return [-roothalf, -roothalf];
  else if(direction == 4) return [-1,0];
  else if(direction == 5) return [-roothalf, roothalf];
  else if(direction == 6) return [0,1];
  else if(direction == 7) return [roothalf, roothalf];
}

function mod(x,y) {
  if(x >= 0) return x%y;
  else return y-((-x)%y);
}

function isBetween(x,y,z) {
  return (x >= y && y >= z) || (x <= y && y <= z);
}

function canKick(obj) {
  let x = armature.position.x + d()[0];
  let y = armature.position.y + d()[1];
  return isBetween(x-1, obj.position.x, x+1) && isBetween(y-1, obj.position.y, y+1)
}

const loader = new GLTFLoader();
let whatLoaded = loader.load('model/humanoid.glb', function (gltf) {
    scene.add(gltf.scene);
    humanoid = gltf.scene.getObjectByName('Humanoid');
    armature = gltf.scene.getObjectByName('Armature');
    armature.position.set(0,0,0);
    armature.quaternion.setFromEuler(new THREE.Euler(2*Math.PI/4, 2*Math.PI/4, 0*Math.PI/4));
    mixer = new THREE.AnimationMixer(armature);
    clips = gltf.animations;
    walkClip = THREE.AnimationClip.findByName(clips, "Walk");
    walkAction = mixer.clipAction(walkClip);
    startWalkClip = THREE.AnimationClip.findByName(clips, "StartWalk");
    startWalkAction = mixer.clipAction(startWalkClip);
    endWalkClip = THREE.AnimationClip.findByName(clips, "EndWalk");
    endWalkAction = mixer.clipAction(endWalkClip);
    pickUpClip = THREE.AnimationClip.findByName(clips, "PickUp");
    pickUpAction = mixer.clipAction(pickUpClip);
    pickUpHoldClip = THREE.AnimationClip.findByName(clips, "PickUpHold");
    pickUpHoldAction = mixer.clipAction(pickUpClip);
    putDownClip = THREE.AnimationClip.findByName(clips, "PutDown");
    putDownAction = mixer.clipAction(pickUpClip);
    kickClip = THREE.AnimationClip.findByName(clips, "Kick");
    kickAction = mixer.clipAction(kickClip);
    turnLeftClip = THREE.AnimationClip.findByName(clips, "TurnLeft");
    turnLeftAction = mixer.clipAction(turnLeftClip);
    turnRightClip = THREE.AnimationClip.findByName(clips, "TurnRight");
    turnRightAction = mixer.clipAction(turnRightClip);
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
ball.quaternion.setFromEuler(new THREE.Euler(2*Math.PI/4, 0, 0));

const camera = new THREE.PerspectiveCamera(75, 16/9, 0.01, 100);
camera.position.set(0, -10, 4);
camera.lookAt(0,0,0);

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(10,-10,-10);
scene.add(light);

let keysPressed = {};
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyUp(event) {
  delete keysPressed[event.which];
  if(event.which == 38) {
    walkAction.stop();
  }
};
function onDocumentKeyDown(event) {
  keysPressed[event.which] = true;
  if(keysPressed[17]) {
    if(keysPressed[98]) {
      camera.rotateX(-Math.PI/36);
    } else if(keysPressed[100]) {
      camera.rotateZ(-Math.PI/36);
    } else if(keysPressed[102]) {
      camera.rotateZ(Math.PI/36);
    } else if(keysPressed[104]) {
      camera.rotateX(Math.PI/36);
    }
  } else if(keysPressed[37]) {
    if(!turnLeftAction.isRunning() && !turnRightAction.isRunning()) {
      turnLeftAction.play();
      direction = mod(direction-1, 8);
      for(var i=0; i<10; i++) {
        setTimeout(() => {
          armature.rotateY(0.1*Math.PI/4);
        }, 100*i);
      }
      setTimeout(() => {
        turnLeftAction.stop();
      }, 1000);
    }
  } else if(keysPressed[38]) {
    if(!walkAction.isRunning()) {
      walkAction.play();
    }
    armature.translateZ(0.05);
  } else if(keysPressed[39]) {
    if(!turnLeftAction.isRunning() && !turnRightAction.isRunning()) {
      turnRightAction.play();
      direction = mod(direction+1, 8);
      for(var i=0; i<10; i++) {
        setTimeout(() => {
          armature.rotateY(-0.1*Math.PI/4);
        }, 100*i);
      }
      setTimeout(() => {
        turnRightAction.stop();
      }, 1000);
    }
  } else if(keysPressed[40]) {
    if(!pickUpAction.isRunning()) {
      pickUpAction.setLoop(THREE.LoopOnce);
      pickUpAction.clampWhenFinished = true;
      pickUpAction.reset();
      pickUpAction.play();
    } else {
      putDownAction.setLoop(THREE.LoopOnce);
      putDownAction.reset();
      pickUpAction.stop();
      putDownAction.play();
    }
  } else if(keysPressed[75]) {
    if(!kickAction.isRunning()) {
      kickAction.setLoop(THREE.LoopOnce);
      kickAction.reset();
      kickAction.play();
      if(canKick(ball)) {
        var dd = d();
        for(var i=1; i<=20; i++) {
          setTimeout(() => {
            ball.position.x -= dd[0]*(20-i)/10;
            ball.position.y -= dd[1]*(20-i)/10;
          }, 170*i);
        }
      }
      if(canKick(cube)) {
        var dd = d();
        for(var i=1; i<=10; i++) {
          setTimeout(() => {
            cube.position.x -= dd[0]*(10-i)/10;
            cube.position.y -= dd[1]*(10-i)/10;
          }, 170*i);
        }
      }
    }
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
  var delta = clock.getDelta();
  if(mixer) {
    mixer.update(delta);	
  }
  renderer.render(scene, camera);
  renderer.physicallyCorrectLights = true; 
}
renderer.setAnimationLoop(animate);

