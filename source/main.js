import { print, registerMethods, Stage } from "../libraries/habitat-import.js"
import { fragmentShaderSource } from "./shaders/fragment.js"
import { vertexShaderSource } from "./shaders/vertex.js"
import { createProgram, createShader } from "./utilities/shader.js"

registerMethods()
window.print = print

const stage = new Stage({ paused: true })
stage.start = (gl) => {
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
	const program = createProgram(gl, vertexShader, fragmentShader)
}
