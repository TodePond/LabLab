export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 u_resolution;

out vec4 outColor;
 
void main() {

	vec2 position = gl_FragCoord.xy / u_resolution;
	float x = position.x;
	float y = position.y;

	float red = 1.0;
	float green = 1.0;
	float blue = 1.0;
	float alpha = 1.0;

	red = x;
	green = y;

	outColor = vec4(red, green, blue, alpha);
}
`
