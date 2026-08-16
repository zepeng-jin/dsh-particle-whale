/**
 * 3D 粒子鲸鱼顶点着色器 (Vertex Shader)
 * 包含：离散重组插值、脊椎游动动力学波动、鼠标扭曲排斥、动态光照与思考脉冲
 */
export const WHALE_VERTEX_SHADER = `
  attribute float aOpacity;
  attribute float aIndex;
  attribute float aEdge;
  attribute vec3 aNormal;
  attribute vec3 aScattered;
  attribute vec3 aJitter;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  uniform float uMouseDistort;
  uniform float uAssembly;
  uniform float uLoose;
  uniform float uScatter;
  uniform float uWorking;
  uniform vec3 uLightPos;
  uniform float uLightRange;
  uniform float uShadeMin;
  uniform float uShadeMax;

  varying float vOpacity;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vAssembly;
  varying float vLight;
  varying float vWorking;

  void main() {
    vOpacity = aOpacity;
    vAssembly = uAssembly;
    vWorking = uWorking;

    vec3 targetCenter = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vec3 localOffset = (instanceMatrix * vec4(position, 1.0)).xyz - targetCenter;

    float pulse = 1.0 + 0.12 * uWorking * sin(uTime * 3.5 + aIndex * 0.4);
    localOffset *= pulse;

    float assembly = smoothstep(0.0, 1.0, uAssembly);
    vec3 center = mix(aScattered, targetCenter, assembly);
    vec3 pos = center + localOffset;

    float loose = uLoose * assembly;
    if (loose > 0.001) {
      pos += aJitter * loose * (0.8 + 0.6 * uWorking);

      float spineProg = clamp((targetCenter.x + 2.2) / 5.2, 0.0, 1.0);
      float tailFactor = spineProg * spineProg;

      float swimFreq = mix(1.2, 2.6, uWorking);
      float wavePhase = uTime * swimFreq - targetCenter.x * 0.9;

      float waveY = sin(wavePhase) * (0.02 + 0.18 * tailFactor);
      float waveZ = cos(wavePhase * 0.85) * (0.015 + 0.12 * tailFactor);

      pos.y += waveY * loose;
      pos.z += waveZ * loose;
    }

    if (uScatter > 0.001) {
      vec3 scatterOffset = (aScattered - center) * (uScatter * mix(0.6, 1.2, aEdge));
      scatterOffset.z += sin(uTime * 1.2 + aIndex * 0.5) * uScatter * 1.2;
      pos += scatterOffset;
    }

    if (assembly > 0.7) {
      vec2 toMouse = center.xy - uMouse;
      float mouseDist = length(toMouse);
      if (mouseDist < uMouseRadius && mouseDist > 0.001) {
        float t = 1.0 - mouseDist / uMouseRadius;
        float force = t * t * t * uMouseStrength;
        vec2 radialDir = toMouse / mouseDist;
        float noiseAngle = sin(aIndex * 0.37 + uTime * 0.5) * uMouseDistort;
        vec2 pushDir = vec2(radialDir.x * cos(noiseAngle) - radialDir.y * sin(noiseAngle), radialDir.x * sin(noiseAngle) + radialDir.y * cos(noiseAngle));
        pos.xy += pushDir * force * 2.2;
        pos.z += sin(aIndex * 1.5 + uTime) * force * 1.2;
      }
    }

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize((modelMatrix * vec4(aNormal, 0.0)).xyz);

    float lightDist = distance(worldPos.xyz, uLightPos);
    float lit = clamp(1.0 - lightDist / uLightRange, 0.0, 1.0);
    vLight = mix(uShadeMin, uShadeMax, lit * lit);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

/**
 * 3D 粒子鲸鱼片元着色器 (Fragment Shader)
 * 包含：双模态菲涅尔光晕、高光漫反射与主题深浅色适配
 */
export const WHALE_FRAGMENT_SHADER = `
  varying float vOpacity;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vAssembly;
  varying float vLight;
  varying float vWorking;

  uniform float uTime;
  uniform vec3 uColor;
  uniform float uIsDark;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vec3(0.0, 0.0, 1.0));
    float NdotV = abs(dot(N, V));
    float fresnel = pow(1.0 - NdotV, 2.2);

    vec3 L = normalize(vec3(0.3, 0.8, 0.9));
    float diff = max(0.2, dot(N, L));
    vec3 H = normalize(L + V);
    float spec = pow(max(0.0, dot(N, H)), 8.0) * 0.45;

    float pulseSpeed = mix(1.0, 3.0, vWorking);
    float pulseWave = sin(uTime * pulseSpeed - vWorldPos.x * 2.2 + vWorldPos.y * 1.5) * 0.5 + 0.5;
    float workingGlow = vWorking * pulseWave * 0.35;

    if (uIsDark > 0.5) {
      float baseAlpha = mix(0.40, 0.80, vAssembly) + fresnel * 0.35 + workingGlow;
      float alpha = vOpacity * baseAlpha;

      vec3 activeColor = mix(uColor, vec3(0.10, 0.95, 1.0), vWorking * 0.50);
      vec3 color = activeColor * (diff * vLight + spec) + fresnel * vec3(0.3, 0.6, 1.0) * vLight;
      color = mix(color, color * vec3(1.10, 1.05, 0.95), clamp(vLight - 1.0, 0.0, 1.0));
      gl_FragColor = vec4(color, alpha);
    } else {
      float alpha = vOpacity * (mix(0.50, 0.85, vAssembly) + fresnel * 0.3 + workingGlow * 0.3);
      vec3 activeColor = mix(uColor, vec3(0.05, 0.45, 0.95), vWorking * 0.4);
      vec3 lightBaseColor = activeColor * (0.50 + 0.50 * diff * min(vLight, 1.5)) + fresnel * vec3(0.15, 0.35, 0.8);
      gl_FragColor = vec4(lightBaseColor, alpha);
    }
  }
`
