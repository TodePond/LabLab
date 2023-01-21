import { getPointer, print, registerMethods, Stage } from "../libraries/habitat-import.js"
import { fragmentShaderSource } from "./shaders/fragment.glsl.js"
import { vertexShaderSource } from "./shaders/vertex.glsl.js"
import { createProgramFromSources } from "./utilities/shader.js"

registerMethods()
window.print = print

const stage = new Stage({ paused: false })
stage.start = (gl) => {
	stage.program = createProgramFromSources(gl, vertexShaderSource, fragmentShaderSource)
	gl.useProgram(stage.program)

	const positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)

	stage.locations = {
		position: gl.getAttribLocation(stage.program, "position"),
		resolution: gl.getUniformLocation(stage.program, "resolution"),
		time: gl.getUniformLocation(stage.program, "time"),
		pointer: gl.getUniformLocation(stage.program, "pointer"),
	}

	const size = 2
	const type = gl.FLOAT
	const normalise = false
	const stride = 0
	const offset = 0
	gl.vertexAttribPointer(stage.locations.position, size, type, normalise, stride, offset)
	gl.enableVertexAttribArray(stage.locations.position)

	stage.pointer = getPointer()
}

stage.update = (gl, time) => {
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.uniform1f(stage.locations.time, time * 0.001)
	gl.uniform2f(stage.locations.pointer, stage.pointer.position.x, gl.canvas.height - stage.pointer.position.y)

	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 6
	gl.drawArrays(primitiveType, offset, count)
}

stage.resize = (gl) => {
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	gl.uniform2f(stage.locations.resolution, gl.canvas.width, gl.canvas.height)
}
