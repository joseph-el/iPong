struct Gradient {
    vec2 start;
    vec2 end;
    vec4 startColor;
    vec4 endColor;
    float alpha;
    float overlay;
};

uniform sampler2D map;
uniform Gradient gradients[MAX_GRADIENTS];

varying vec2 directUV;
varying vec4 screenUV;

vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, step(base, vec3(0.5)));
}

void main() {
    vec3 color = texture(map, directUV).rgb;
    vec2 gradientUV = screenUV.xy / screenUV.w * 0.5 + 0.5;

    for (int i = 0; i < MAX_GRADIENTS; i++) {

        // Calculate overall gradient color
        vec2 dir = gradients[i].end - gradients[i].start;
        vec2 relCoords = gradientUV - gradients[i].start;
        float t = dot(relCoords, dir) / dot(dir, dir);
        vec4 ramp = mix(
            gradients[i].startColor,
            gradients[i].endColor,
            t
        );

        // Apply overlay blend
        ramp.rgb = mix(
            ramp.rgb,
            blendOverlay(color, ramp.rgb),
            gradients[i].overlay
        );

        // Final color mix
        color = mix(color, ramp.rgb, ramp.a * gradients[i].alpha);
    }

    gl_FragColor = vec4(color, 1.0);
}
