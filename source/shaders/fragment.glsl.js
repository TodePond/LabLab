export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 u_resolution;

out vec4 outColor;
 
void main() {

	vec2 position = gl_FragCoord.xy / u_resolution;
	vec4 colour = vec4(1.0, 1.0, 1.0, 1.0);

	colour.x = position.x;
	colour.y = position.y;
	colour.z = 0.5;
	
	outColor = vec4(colour);
}
`
