/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

vertexShader = `
    in vec4 aPosition;

    uniform mat4 P;
    uniform mat4 MV;

    void main() {
        gl_Position = P * MV * aPosition;
    }
`;

class BasicCube {
    constructor(gl, vertexShader, fragmentShader) {

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);
        const co = new Float16Array([ 0.5,  0.5,  0.5,    0.5,  0.5, -0.5,    0.5, -0.5,  0.5,
                                      0.5, -0.5, -0.5,   -0.5,  0.5,  0.5,   -0.5,  0.5, -0.5,
                                     -0.5, -0.5,  0.5,   -0.5, -0.5, -0.5]);
        const triangles = new Int8Array([0,1,2, 1,2,3, 2,3,7, 7,6,2, 6,2,0, 0,4,6,
                                         4,6,5, 6,5,7, 5,7,3, 3,1,5, 1,5,4, 5,0,1]);
        const colors = new Float16Array([1,1,1, 1,1,0, 1,0,1, 1,0,0, 0,1,1, 0,1,0, 0,0,1, 0,0,0]);
        this.draw = () => {
            // program.use();
        };
    }
};
