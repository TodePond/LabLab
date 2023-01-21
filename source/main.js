import { print, registerMethods, Stage } from "../libraries/habitat-import.js"
import { fragmentShaderSource } from "./shaders/fragment.glsl.js"
import { vertexShaderSource } from "./shaders/vertex.glsl.js"
import { createProgram, createShader } from "./utilities/shader.js"

registerMethods()
window.print = print

const stage = new Stage({ paused: true })
stage.start = (gl) => {
	// Make our program (pair of shaders)
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
	const program = createProgram(gl, vertexShader, fragmentShader)

	const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
	const positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	const positions = new Float32Array([0, 0, 0, 0.5, 0.7, 0])
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)
	gl.enableVertexAttribArray(positionAttributeLocation)

	const size = 2
	const type = gl.FLOAT
	const normalise = false
	const stride = 0
	const offset = 0
	gl.vertexAttribPointer(positionAttributeLocation, size, type, normalise, stride, offset)

	gl.useProgram(program)
	gl.bindVertexArray(vao)
}

stage.tick = (gl) => {
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT)

	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 3
	gl.drawArrays(primitiveType, offset, count)
}

stage.resize = (gl) => {
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
}
