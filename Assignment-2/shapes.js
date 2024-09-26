import { Tetrahedron } from './Shapes/Tetrahedron.js';
import { Sphere } from './Shapes/Sphere.js';
import { Cone } from './Shapes/Cone.js';

let gl = undefined;

const TETRA_CYCLE = 100;
const SPHERE_CYCLE = 100;
const CONE_CYCLE = 100;

var tetra, sphere, cone, tetraStack, sphereStack, coneStack, tetraFrame, sphereFrame, coneFrame;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }
    tetra = new Tetrahedron(gl);
    sphere = new Sphere(gl);
    cone = new Cone(gl);
    tetraStack = new MatrixStack();
    sphereStack = new MatrixStack();
    coneStack = new MatrixStack();
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);
    tetraFrame = 0;
    sphereFrame = 0;
    coneFrame = 0;
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let zSphere = sphereFrame;
    sphereStack.push()
    sphereStack.translate(0, 0, zSphere);
    sphere.MV = sphereStack.current();
    sphere.draw();
    sphereStack.pop();
    tetraFrame++;
    sphereFrame++;
    coneFrame++;
    if(tetraFrame >= TETRA_CYCLE) tetraFrame = 0;
    if(sphereFrame >= SPHERE_CYCLE) sphereFrame = 0;
    if(coneFrame >= CONE_CYCLE) coneFrame = 0;
    requestAnimationFrame(render);
}

window.onload = init;

