vec3 position;
float projectionMatrix;
float modelViewMatrix;

void main(){
    vec3 transformed = position.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
}