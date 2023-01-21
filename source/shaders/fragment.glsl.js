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
	CYAN,
	BLUE,
	PURPLE,
	PINK,
	CORAL,
	RED,
	ORANGE,
	YELLOW
);

vec4 gradient(float t, float offset) {
	t = t + offset;
	float index = t * float(GRADIENT.length() - 1);
	int i = int(index);
	float f = fract(index);
	return bilerp(GRADIENT[i], GRADIENT[i + 1], GRADIENT[i], GRADIENT[i + 1], vec2(f, 0.0));
}

vec4 gradient(float t) {
	return gradient(t, 0.0);
}

vec4 gradientLoop(float t, float offset) {
	t = fract(t + offset);
	return gradient(t, offset);
}

vec4 gradientLoop(float t) {
	return gradientLoop(t, 0.0);
}

vec4 average(vec4 a, vec4 b) {
	return lerp(a, b, 0.5);
}

float pulse(float value, float speed, float offset) {
	return value * (sin((time + offset) * speed) + 1.0) / 2.0;
}

float pulse(float value, float speed) {
	return pulse(value, speed, 1.0);
}

float pulse(float value) {
	return pulse(value, 1.0);
}

vec2 canvasToView(vec2 position) {
	return position / resolution;
}

vec2 center(vec2 position) {
	return position - vec2(0.5, 0.5);
}

vec4 mandelbrot(vec2 position) {

	vec2 pointer = center(canvasToView(pointer));

	vec2 c = position;
	vec2 z = vec2(0.0, 0.0);
	float i = 0.0;
	float max = 45.0;
	float excess = 0.0;
	for (i = 0.0; i < max; i += 1.0) {

		float x = z.x;
		float y = z.y;

		float start = x * x;
		float middle = 2.0 * x * y;
		float end = -(y * y);

		z = vec2(start + end, middle) + c;
		excess = z.x * z.x + z.y * z.y - (pointer.x * 25.0);
		if (excess > 0.0) {
			break;	
		}
	}

	if (i >= max) {
		return VOID;
	}

	return gradientLoop(i / max + excess / (pointer.y * 25.0));
}

vec4 getColour(vec2 position) {
	return mandelbrot(position);
}

void main() {
	vec2 position = canvasToView(gl_FragCoord.xy);
	vec2 adjustedPosition = (position - vec2(0.6, 0.5)) * 3.0;
	colour = getColour(adjustedPosition);
}
`
