attribute vec3 aOffset;
attribute vec2 aMetrics;
uniform float uTime;
uniform float uSpeed;
uniform float uTravelLength;

// #include 
void main() {
    // Map z-position to progress: A range of 0 to 1.
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);


    vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
    gl_Position = projectionMatrix * mvPosition;
}