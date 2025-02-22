export default "\n// State of a single shard\nstruct ShardState {\n    mat4 matrix;\n    float opacity;\n    float texture;\n};\n\n// Which shard this vert belongs to\nattribute uint index;\n\n// Transformation state of all shards\nuniform ShardState state[TOTAL_SHARDS];\n\nvarying float opacity;\nvarying vec3 textureBlend;\nvarying vec2 directUV;\nvarying vec4 screenPosition;\nvarying vec3 screenNormal;\n\n// Main\nvoid main() {\n\n    // Calculatin texture weights from shard config\n    float blendVideos = step(1.9, state[index].texture);\n    float blendTexture = step(0.9, state[index].texture) - blendVideos;\n    float blendBackground = clamp(1.0 - blendVideos - blendTexture, 0.0, 1.0);\n    textureBlend = vec3(blendBackground, blendTexture, blendVideos);\n    opacity = state[index].opacity;\n\n    // Computed transformation\n    mat4 transform = projectionMatrix * modelViewMatrix * state[index].matrix;\n\n    // Calculating position and sending varyings\n    directUV = uv;\n    screenPosition = transform * vec4(position, 1.0);\n    screenNormal = normalize((transform * vec4(normal, 0.0)).xyz);\n    gl_Position = screenPosition;\n}\n";