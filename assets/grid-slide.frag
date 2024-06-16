#version 100
precision mediump float;

const float CELL_SIZE = 64.0;

uniform vec2 Resolution;
uniform vec4 Page;
uniform vec3 Time;

uniform float TimeScale;
uniform vec3 FromColor;
uniform vec3 ToColor;
uniform float WackScale;

// From https://stackoverflow.com/a/4275343/
// Don't care about randomness precision as we're using mostly fixed inputs
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
}

vec2 getPoint(in vec2 cell) {
    vec2 even = vec2(equal(mod(cell, 2.0), vec2(0.0)));
    
    float shuffle = 1.0 - pow(sin(TimeScale * Time.x * 0.333), 3.0);
    float x = shuffle * 0.5 * even.y;
    float y = fract(Page.w / Page.y * even.x);

    float angle = rand(cell) * 3.14159;
    vec2 wack = WackScale * vec2(cos(angle), sin(angle));
    
    vec2 offset = vec2(x, y) + wack;
    
    return offset;
}

void main() {
    vec2 pixel = (gl_FragCoord.xy) / CELL_SIZE;
    vec2 cell = floor(pixel);
    
    vec4 result = vec4(cell, 0, 0);
    float minDistance = 1e20;
    for (int y = -2; y <= 2; ++y) {
        for (int x = -2; x <= 2; ++x) {
            vec2 current = cell + vec2(x, y);
            vec2 offset = getPoint(current);
            float distance = length(pixel - (current + offset));
            
            if (distance < minDistance) {
                result = vec4(current, offset);
                minDistance = distance;
            }
        }
    }
    
    float totalCells = ceil(Resolution.y / CELL_SIZE);
    
    float checker = mod(result.x + result.y, 2.0);
    float gradient = smoothstep(0.0, 1.0, (pixel.y - result.y + 1.0) / 2.0);
    
    float t = (result.y - gradient * checker) / totalCells;
    vec3 color = mix(ToColor, FromColor, t);
    
    gl_FragColor = vec4(color, 1.0);
}