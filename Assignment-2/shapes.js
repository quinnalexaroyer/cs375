let gl = undefined;

const TETRA_CYCLE = 100;
const SPHERE_CYCLE = 100;
const CONE_CYCLE = 100;

var tetra, sphere, cone, sphereStack, sphereFrame;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }
    tetra = new Tetrahedron(gl);
    sphere = new Sphere(gl, 18, 36);
    cone = new Cone(gl);
    sphereStack = new MatrixStack();
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);
    tetraFrame = 0;
    sphereFrame = 0;
    coneFrame = 0;
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var z;
    //if(sphereFrame < 50) z = 0.01*sphereFrame;
    //else z = 1-0.01*sphereFrame;
    z = -sphereFrame*sphereFrame/3000 + sphereFrame/30
    sphereStack.push()
    sphereStack.translate(0, z, 0);
    sphereStack.scale(0.1, 0.1, 0.1);
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

