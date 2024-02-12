/**
 * @param {string} fragmentShaderSource
 * @param {HTMLCanvasElement} target
 * @param {[[string, (WebGLRenderingContext, WebGLUniformLocation) => void]]} uniforms
 */
function makePretty(fragmentShaderSource, target, uniforms = []) {
    window.addEventListener("resize", updateSize);

    const gl = target.getContext("webgl");
    updateSize();

    if (gl == null) {
        console.warn("WebGL unsupported, skipping prettification");
        return;
    }

    const context = createProgramContext({
        vertex: `
            #version 100
            attribute vec2 Position;
            void main() {
                gl_Position = vec4(Position, 0.0, 0.0);
            }
        `,
        fragment: fragmentShaderSource,
        attributes: [
            {
                name: "Position",
                type: gl.FLOAT,
                components: 2
            }
        ],
        uniforms: [
            "Resolution",
            "Page",
            "Time",
            ...uniforms.map(x => x[0]),
        ],
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, context.attributes.Position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        1, 1,
        -1, 1,
        1, -1,
        -1, -1,
    ]), gl.STATIC_DRAW);

    gl.useProgram(context.program);

    const startTime = Date.now() / 1000;
    drawFrame();

    function drawFrame() {
        const seconds = Date.now() / 1000 - startTime;
        gl.uniform2f(
            context.uniforms.Resolution,
            gl.drawingBufferWidth,
            gl.drawingBufferHeight
        );
        gl.uniform4f(
            context.uniforms.Page,
            document.body.scrollWidth,
            document.body.scrollHeight,
            window.scrollX,
            window.scrollY
        );
        gl.uniform3f(
            context.uniforms.Time,
            seconds,
            Math.sin(seconds),
            Math.cos(seconds)
        );

        for (const [name, setter] of uniforms) {
            setter(gl, context.uniforms[name]);
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(drawFrame);
    }

    function updateSize() {
        const {width, height} = target.getBoundingClientRect();
        target.width = width;
        target.height = height;
        gl.viewport(0, 0, width, height);
    }

    /**
     * @param {{
     *     vertex: string,
     *     fragment: string,
     *     attributes: {
     *         name: string,
     *         type: number,
     *         components: number
     *     }[],
     *     uniforms: string[]
     * }} recipe
     * @return {{
     *     program: WebGLProgram,
     *     attributes: {[name: string]: WebGLBuffer},
     *     uniforms: {[name: string]: WebGLUniformLocation},
     * }}
     * */
    function createProgramContext({vertex, fragment, attributes, uniforms}) {
        const program = createProgram(gl, [
            loadShader(gl, gl.VERTEX_SHADER, vertex),
            loadShader(gl, gl.FRAGMENT_SHADER, fragment),
        ]);

        const context = {
            program,
            attributes: {},
            uniforms: {},
        };

        for (const descriptor of attributes) {
            const location = gl.getAttribLocation(program, descriptor.name);
            const buffer = gl.createBuffer();
            context.attributes[descriptor.name] = buffer;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(location, descriptor.components, descriptor.type, false, 0, 0);
            gl.enableVertexAttribArray(location);
        }

        for (const descriptor of uniforms) {
            context.uniforms[descriptor] = gl.getUniformLocation(program, descriptor);
        }

        return context;
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {GLenum} type
     * @param {string} source
     * @return {WebGLShader | null}
     */
    function loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {WebGLShader[]} shaders
     * @return {WebGLProgram}
     * */
    function createProgram(gl, shaders) {
        const program = gl.createProgram();

        for (const shader of shaders) {
            gl.attachShader(program, shader);
        }

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn("Could not link shader program:", gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }

        for (const shader of shaders) {
            gl.detachShader(program, shader);
            gl.deleteShader(shader);
        }

        return program;
    }
}

(async () => {
    function initialize() {
        if (typeof onPrettyReady === "function") {
            onPrettyReady();
        }
    }

    if (document.readyState !== "loading") {
        initialize();
    } else {
        document.addEventListener("DOMContentLoaded", initialize);
    }
})()