export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;

out vec4 colour;

const vec4 VOID = vec4(6.0 / 255.0, 7.0 / 255.0, 10.0 / 255.0, 1.0);
const vec4 BLACK = vec4(23.0 / 255.0, 29.0 / 255.0, 40.0 / 255.0, 1.0);
const vec4 GREY = vec4(55.0 / 255.0, 70.0 / 255.0, 98.0 / 255.0, 1.0);
const vec4 SILVER = vec4(159.0 / 255.0, 174.0 / 255.0, 204.0 / 255.0, 1.0);
const vec4 WHITE = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 GREEN = vec4(70.0 / 255.0, 255.0 / 255.0, 128.0 / 255.0, 1.0);
const vec4 CYAN = vec4(70.0 / 255.0, 204.0 / 255.0, 255.0 / 255.0, 1.0);
const vec4 BLUE = vec4(70.0 / 255.0, 128.0 / 255.0, 255.0 / 255.0, 1.0);
const vec4 PURPLE = vec4(128.0 / 255.0, 67.0 / 255.0, 247.0 / 255.0, 1.0);
const vec4 PINK = vec4(255.0 / 255.0, 128.0 / 255.0, 222.0 / 255.0, 1.0);
const vec4 CORAL = vec4(255.0 / 255.0, 128.0 / 255.0, 128.0 / 255.0, 1.0);
const vec4 RED = vec4(255.0 / 255.0, 67.0 / 255.0, 70.0 / 255.0, 1.0);
const vec4 ORANGE = vec4(255.0 / 255.0, 128.0 / 255.0, 70.0 / 255.0, 1.0);
const vec4 YELLOW = vec4(255.0 / 255.0, 255.0 / 255.0, 70.0 / 255.0, 1.0);

vec4 lerp(vec4 a, vec4 b, float t) {
	return a + t * (b - a);
}

vec4 bilerp(vec4 a, vec4 b, vec4 c, vec4 d, vec2 t) {
	return lerp(lerp(a, b, t.x), lerp(c, d, t.x), t.y);
}

const vec4[] GRADIENT = vec4[](
	GREEN,
	BLUE,
	PURPLE,
	PINK
);

vec4 gradient(float t) {
	int length = GRADIENT.length();
	int index = int(t * float(length - 1));
	float t2 = t * float(length - 1) - float(index);
	return lerp(GRADIENT[index], GRADIENT[index + 1], t2);
}

vec4 average(vec4 a, vec4 b) {
	return lerp(a, b, 0.5);
}

void main() {

	vec2 position = gl_FragCoord.xy / resolution;
	vec2 pointer = pointer / resolution;

	colour = gradient(distance(position, pointer) * 0.6);
}
`
