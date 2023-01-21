export const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 outColor;
 
void main() {
	float red = gl_FragCoord.x / 1000.0;
	float green = gl_FragCoord.y / 1000.0;
	outColor = vec4(red, green, 0.5, 1);
}
`
