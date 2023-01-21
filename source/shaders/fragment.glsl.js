export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 resolution;

out vec4 colour;

void main() {

	vec2 position = gl_FragCoord.xy / resolution;
	colour = vec4(1.0, 1.0, 1.0, 1.0);

	colour.x = position.x;
	colour.y = position.y;
	colour.z = 0.5;
}
`
