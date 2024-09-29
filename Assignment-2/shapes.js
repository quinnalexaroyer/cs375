let gl = undefined;

const CYCLE = 100;
const SQUASH_FRAMES = 10;
const SQUASH_SIZE = 0.6;
var tetra, sphere, cone, mv, frame;
frame = 0

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }
    tetra = new Tetrahedron(gl);
    sphere = new Sphere(gl, 36, 18);
    cone = new Cone(gl, 36);
    mv = new MatrixStack();
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);
    tetraFrame = 0;
    frame = 0;
    coneFrame = 0;
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var y, yScale;
    y = -frame*frame/3000 + frame/30;
    yScale = 0.1;
    if(frame < SQUASH_FRAMES) {
        y += -0.1 * (1-SQUASH_SIZE) * (SQUASH_FRAMES - frame) / SQUASH_FRAMES;
        yScale += -0.1 * (1-SQUASH_SIZE) * (SQUASH_FRAMES - frame) / SQUASH_FRAMES;
    }
    else if(frame > CYCLE-SQUASH_FRAMES) {
        y += 0.1 * (1-SQUASH_SIZE) * (CYCLE - SQUASH_FRAMES - frame) / SQUASH_FRAMES;
        yScale += 0.1 * (1-SQUASH_SIZE) * (CYCLE - SQUASH_FRAMES - frame) / SQUASH_FRAMES;
    }
    mv.push()
    mv.translate(0, y, 0);
    mv.scale(0.1, yScale, 0.1);
    sphere.MV = mv.current();
    sphere.draw();
    mv.pop();
    mv.push();
    var dx = 0.01*Math.abs(frame - CYCLE/2)
    mv.translate(-0.5 + dx, -0.4, 0.8);
    mv.rotate(3.6*frame, [0,0,1]);
    mv.scale(0.1, 0.1, 0.1);
    tetra.MV = mv.current();
    tetra.draw();
    mv.pop();
    mv.push();
    mv.translate(0.5, -0.4, 0.8);
    mv.rotate(3.6*frame, [1,0,0]);
    mv.scale(0.1, 0.1, 0.1);
    cone.MV = mv.current();
    cone.draw();
    mv.pop();
    frame++;
    if(frame >= CYCLE) frame = 0;
    requestAnimationFrame(render);
}

window.onload = init;

