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
        
            uniform mat4 P;
            uniform mat4 MV;
        
            void main() {
                vColor = aColor;
                gl_Position = P * MV * aPosition;
            }
        `;
        
        fragmentShader ||= `
            uniform vec4 color;
            out vec4 fColor;
        
            void main() {
                fColor = color;
            }
        `;

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);
        let co = new Float32Array([
             0.5,  0.5,  0.5,    0.5, -0.5,  0.5,    0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,    0.5, -0.5, -0.5,    0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,    0.5, -0.5, -0.5,   -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,   -0.5, -0.5,  0.5,    0.5, -0.5,  0.5,
            -0.5, -0.5,  0.5,    0.5,  0.5,  0.5,    0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,   -0.5, -0.5,  0.5,   -0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,   -0.5, -0.5,  0.5,   -0.5,  0.5, -0.5,
            -0.5, -0.5,  0.5,   -0.5, -0.5, -0.5,   -0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5,   -0.5, -0.5, -0.5,    0.5, -0.5, -0.5,
             0.5, -0.5, -0.5,    0.5,  0.5, -0.5,   -0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,   -0.5,  0.5,  0.5,   -0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5,    0.5,  0.5, -0.5,    0.5,  0.5,  0.5
        ]);
        let color = new Uint8Array([
            255, 255, 255, 255,      255, 128,   0, 255,      255,   0,   0, 255,
            255,   0,   0, 255,      255, 255,   0, 255,      255, 128,   0, 255,
            255, 128,   0, 255,      255, 255,   0, 255,        0,   0,   0, 255,
              0,   0,   0, 255,      128,   0, 255, 255,      255, 128,   0, 255,
            128,   0, 255, 255,      255, 255, 255, 255,      255, 128,   0, 255,
            255, 255, 255, 255,      128,   0, 255, 255,        0, 255,   0, 255,
              0, 255,   0, 255,      128,   0, 255, 255,        0,   0, 255, 255,
            128,   0, 255, 255,        0,   0,   0, 255,        0,   0, 255, 255,
              0,   0, 255, 255,        0,   0,   0, 255,      255, 255,   0, 255,
            255, 255,   0, 255,      255,   0,   0, 255,        0,   0, 255, 255,
            255,   0,   0, 255,        0, 255,   0, 255,        0,   0, 255, 255,
              0,   0, 255, 255,      255,   0,   0, 255,      255, 255, 255, 255
        ]);
        let aPosition = new Attribute(gl, program, "aPosition", co, 3, gl.FLOAT);
        let aColor = new Attribute(gl, program, "aColor", color, 4, gl.UNSIGNED_BYTE);
        this.draw = () => {
            gl.useProgram(program);
            program.MV();
            program.P();
            program.color();
            aPosition.enable();
            gl.drawArrays(gl.TRIANGLES, 0, aPosition.count);
            aPosition.disable();
        };
    }
};
