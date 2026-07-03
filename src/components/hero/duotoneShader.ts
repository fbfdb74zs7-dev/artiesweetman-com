/**
 * Duotone field. Maps luminance → two-colour ramp (paper → ink), the exact
 * treatment a high-contrast portrait will get. With no portrait yet it renders
 * a soft photographic gradient + fbm grain so the frame reads as "a duotone
 * image is coming here", drifting slowly. When uHasMap = 1 the plane samples
 * uMap's luminance instead — drop a portrait in later, zero layout change.
 */
export const duotoneVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const duotoneFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;   // 0..1 hero scroll progress (drift)
  uniform vec3  uInk;      // dark stop
  uniform vec3  uPaper;    // light stop
  uniform float uHasMap;
  uniform sampler2D uMap;

  // --- value noise / fbm ---
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0)), d = hash(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float lum;

    if(uHasMap > 0.5){
      vec3 tex = texture2D(uMap, uv).rgb;
      lum = dot(tex, vec3(0.299,0.587,0.114));
    } else {
      // slow drifting photographic field: diagonal gradient + soft form + grain
      float drift = uTime*0.03 + uScroll*0.35;
      float form = fbm(uv*2.4 + vec2(drift, -drift*0.6));
      float grad = smoothstep(0.05, 1.05, uv.y*0.65 + uv.x*0.35);
      lum = mix(grad, form, 0.55);
      lum = clamp(lum*0.9 + 0.08, 0.0, 1.0);
    }

    // fine film grain, animated — very low amplitude
    float g = noise(vUv*vec2(900.0,1300.0) + uTime*8.0);
    lum += (g - 0.5) * 0.05;

    // gentle contrast so it reads as a duotone plate
    lum = clamp((lum - 0.5) * 1.18 + 0.5, 0.0, 1.0);

    vec3 col = mix(uInk, uPaper, lum);

    // subtle vignette to seat the figure in the frame
    float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
    col = mix(col*0.94, col, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;
