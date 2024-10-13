/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);
        const co = new Float32Array([ 0.5,  0.5,  0.5,    0.5,  0.5, -0.5,    0.5, -0.5,  0.5,
                                      0.5, -0.5, -0.5,   -0.5,  0.5,  0.5,   -0.5,  0.5, -0.5,
                                     -0.5, -0.5,  0.5,   -0.5, -0.5, -0.5]);
        const triangles = new Int8Array([0,2,1, 1,3,2, 2,3,7, 7,6,2, 6,0,2, 0,6,4,
                                         4,6,5, 6,7,5, 5,7,3, 3,1,5, 1,4,5, 5,1,0]);
        const colors = new Float32Array([1,1,1, 1,1,0, 1,0,1, 1,0,0, 0,1,1, 0,1,0, 0,0,1, 0,0,0]);
        this.draw = () => {
            // program.use();
        };
    }
};
