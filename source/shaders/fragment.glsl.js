export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 u_resolution;

out vec4 outColor;
 
void main() {

	vec2 position = gl_FragCoord.xy / u_resolution;
	float x = position.x;
	float y = position.y;

	float red = x;
	float green = y;
	outColor = vec4(red, green, 0.5, 1);
}
`
