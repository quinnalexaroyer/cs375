/////////////////////////////////////////////////////////////////////////////
//
//  ExperimentalCube.js
//
//  A cube defined ???
//

class ExperimentalCube {
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
        const indexList = new Int8Array([4, 5, 6, 7, 3, 5, 1, 0, 3, 2, 6, 0, 4, 5]);
        const color = new Float32Array([1,1,1, 1,0,0, 1,1,0, 1,0.5,0, 0,1,1, 0.5,1,0, 0,1,0, 0,0,0]);
        let aPosition = new Attribute(gl, program, "aPosition", co, 3, gl.FLOAT);
        let indices = new Indices(gl, indexList);
        let aColor = new Attribute(gl, program, "aColor", color, 3, gl.FLOAT);
        this.draw = () => {
            program.use();
            aPosition.enable();
            indices.enable();
            aColor.enable();
            gl.drawElements(gl.TRIANGLE_STRIP, indices.count, indices.type, 0);
            aColor.disable();
            indices.disable();
            aPosition.disable();
        };
    }
};
