/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
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
        let co = new Float32Array([
             0.5,  0.5,  0.5,    0.5,  0.5, -0.5,    0.5, -0.5,  0.5, // 0 1 2
             0.5,  0.5, -0.5,    0.5, -0.5, -0.5,    0.5, -0.5,  0.5, // 1 3 2
             0.5, -0.5,  0.5,    0.5, -0.5, -0.5,   -0.5, -0.5, -0.5, // 2 3 7
            -0.5, -0.5, -0.5,   -0.5, -0.5,  0.5,    0.5, -0.5,  0.5, // 7 6 2
            -0.5, -0.5,  0.5,    0.5,  0.5,  0.5,    0.5, -0.5,  0.5, // 6 0 2
             0.5,  0.5,  0.5,   -0.5, -0.5,  0.5,   -0.5,  0.5,  0.5, // 0 6 4
            -0.5,  0.5,  0.5,   -0.5, -0.5,  0.5,   -0.5,  0.5, -0.5, // 4 6 5
            -0.5, -0.5,  0.5,   -0.5, -0.5, -0.5,   -0.5,  0.5, -0.5, // 6 7 5
            -0.5,  0.5, -0.5,   -0.5, -0.5, -0.5,    0.5, -0.5, -0.5, // 5 7 3
             0.5, -0.5, -0.5,    0.5,  0.5, -0.5,   -0.5,  0.5, -0.5, // 3 1 5
             0.5,  0.5, -0.5,   -0.5,  0.5,  0.5,   -0.5,  0.5, -0.5, // 1 4 5
            -0.5,  0.5,  0.5,    0.5,  0.5, -0.5,    0.5,  0.5,  0.5  // 4 1 0
        ]);
        let color = new Float32Array([
            1,1,1,   1,0,0,   1,0.5,0, // 0 1 2
            1,0,0,   1,1,0,   1,0.5,0, // 1 3 2
            1,0.5,0, 1,1,0,   0,0,0,   // 2 3 7
            0,0,0,   0.5,0,1, 1,0.5,0, // 7 6 2
            0.5,0,1, 1,1,1,   1,0.5,0, // 6 0 2
            1,1,1,   0.5,0,1, 0,1,0,   // 0 6 4
            0,1,0,   0.5,0,1, 0,0,1,   // 4 6 5
            0.5,0,1, 0,0,0,   0,0,1,   // 6 7 5
            0,0,1,   0,0,0,   1,1,0,   // 5 7 3
            1,1,0,   1,0,0,   0,0,1,   // 3 1 5
            1,0,0,   0,1,0,   0,0,1,   // 1 4 5
            0,1,0,   1,0,0,   1,1,1    // 4 1 0
        ]);
        let aPosition = new Attribute(gl, program, "aPosition", co, 3, gl.FLOAT);
        let aColor = new Attribute(gl, program, "aColor", color, 3, gl.FLOAT);
        this.draw = () => {
            program.use();
            aPosition.enable();
            aColor.enable();
            gl.drawArrays(gl.TRIANGLES, 0, aPosition.count);
            aColor.disable();
            aPosition.disable();
        };
    }
};
