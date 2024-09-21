
let gl = undefined;

import {Tetrahedron} from './Shapes/Tetrahedron.js';
import {Sphere} from './Shapes/Sphere.js';
import {Cone} from './Shapes/Cone.js';

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
}

function render() {
    // Add rendering code here
}

window.onload = init;

