/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
        vertexShader ||= `
            in vec4 aPosition;
            in vec4 aColor;
        
            uniform mat4 P;
            uniform mat4 MV;
            
            out vec4 vColor;
        
            void main() {
                vColor = aColor;
                gl_Position = P * MV * aPosition;
            }
        `;
        
        fragmentShader ||= `
            in vec4 vColor;
            out vec4 fColor;
        
            void main() {
                fColor = vColor;
            }
        `;
        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);
        const co = new Float32Array([ 0.5,  0.5,  0.5,    0.5,  0.5, -0.5,    0.5, -0.5,  0.5,
                                      0.5, -0.5, -0.5,   -0.5,  0.5,  0.5,   -0.5,  0.5, -0.5,
                                     -0.5, -0.5,  0.5,   -0.5, -0.5, -0.5]);
        const triangles = new Int8Array([0,1,2, 1,3,2, 2,3,7, 7,6,2, 6,0,2, 0,6,4,
                                         4,6,5, 6,7,5, 5,7,3, 3,1,5, 1,4,5, 4,1,0]);
        const color = new Float32Array([1,1,1, 1,1,0, 1,0,1, 1,0,0, 0,1,1, 0,1,0, 0,0,1, 0,0,0]);
        let aPosition = new Attribute(gl, program, "aPosition", co, 3, gl.FLOAT);
        let indices = new Indices(gl, triangles);
        let aColor = new Attribute(gl, program, "aColor", color, 3, gl.UNSIGNED_BYTE);
        this.draw = () => {
            program.use();
            aPosition.enable();
            indices.enable();
            aColor.enable();
            gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);
            aColor.disable();
            indices.disable();
            aPosition.disable();
        };
    }
};
