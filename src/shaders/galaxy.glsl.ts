/**
 * 浩瀚星河背景粒子顶点着色器 (Galaxy Vertex Shader)
 * 包含：慢速宇宙流光自转、透视缩放与基于相位的随机闪烁
 */
export const GALAXY_VERTEX_SHADER = `
  attribute vec3 aColor;
  attribute float aSize;
  attribute vec2 aTwinkle;

  uniform float uTime;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.04 + pos.y * 0.15) * 0.25;
    pos.y += cos(uTime * 0.03 + pos.x * 0.12) * 0.20;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    float dist = length(mvPos.xyz);
    float twinkle = sin(uTime * aTwinkle.x + aTwinkle.y) * 0.5 + 0.5;
    gl_PointSize = aSize * (35.0 / max(dist, 1.0)) * (0.65 + 0.55 * twinkle);

    vColor = aColor;
    vAlpha = uOpacity * (0.35 + 0.65 * twinkle);
  }
`

/**
 * 浩瀚星河背景粒子片元着色器 (Galaxy Fragment Shader)
 * 产生柔和自然的圆形光晕微粒
 */
export const GALAXY_FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, dist);
    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`
