import { print, registerMethods, Stage } from "../libraries/habitat-import.js"
import { fragmentShaderSource } from "./shaders/fragment.glsl.js"
import { vertexShaderSource } from "./shaders/vertex.glsl.js"
import { createProgramFromSources } from "./utilities/shader.js"

registerMethods()
window.print = print

const stage = new Stage({ paused: true })
stage.start = (gl) => {
	const program = createProgramFromSources(gl, vertexShaderSource, fragmentShaderSource)
	stage.program = program
	gl.useProgram(program)

	const positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)

	const positionAttributeLocation = gl.getAttribLocation(program, "position")
	gl.enableVertexAttribArray(positionAttributeLocation)

	const size = 2
	const type = gl.FLOAT
	const normalise = false
	const stride = 0
	const offset = 0
	gl.vertexAttribPointer(positionAttributeLocation, size, type, normalise, stride, offset)
}

stage.tick = (gl) => {
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT)

	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 6
	gl.drawArrays(primitiveType, offset, count)
}

stage.resize = (gl) => {
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	const resolutionUniformLocation = gl.getUniformLocation(stage.program, "resolution")
	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
}
