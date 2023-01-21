export const createShader = (gl, type, source) => {
	const shader = gl.createShader(type)
	gl.shaderSource(shader, source)
	gl.compileShader(shader)
	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
	if (!success) {
		throw Error(gl.getShaderInfoLog(shader))
	}
	return shader
}

export const createProgram = (gl, vertexShader, fragmentShader) => {
	const program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	const success = gl.getProgramParameter(program, gl.LINK_STATUS)
	if (!success) {
		throw Error(gl.getProgramInfoLog(program))
	}
	return program
}
