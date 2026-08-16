import * as THREE from 'three'

/**
 * 官方 DeepSeek Harness 鲸鱼剪影 (SVG 路径, viewBox 0 0 24 18)
 * 局部坐标系中：头部在 -X 方向，尾部在 +X 方向
 */
const WHALE_PATH =
  'M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746V14.4736ZM12.141 8.25988C12.141 8.09488 12.273 7.96338 12.439 7.96338C12.4765 7.96338 12.5105 7.97088 12.541 7.98188C12.5825 7.99688 12.6205 8.01938 12.6505 8.05338C12.7035 8.10588 12.7335 8.18088 12.7335 8.25988C12.7335 8.42489 12.6015 8.55639 12.4355 8.55639C12.2695 8.55639 12.141 8.42489 12.141 8.25988ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z'

const DIGITILE_LIGHT_DEFAULTS = {
  x: 5.0,
  y: 6.0,
  z: 5.0,
  range: 20.0,
  shadeMin: 0.40,
  shadeMax: 1.95,
  followX: 1.05
}

const DIGITILE_MOUSE_DEFAULTS = {
  radius: 5.5,
  strength: 0.85,
  decay: 0.15,
  distort: 5.0
}

const GRID_SIZE = 60
const PARTICLE_SPACING = 0.18

interface WhaleVolumetricData {
  count: number
  positions: Float32Array
  normals: Float32Array
  scatteredPositions: Float32Array
  opacities: Float32Array
  edges: Float32Array
  jitters: Float32Array
}

function generateVolumetricWhaleData(gridSize: number): WhaleVolumetricData {
  const canvas = document.createElement('canvas')
  canvas.width = gridSize
  canvas.height = gridSize
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2d canvas context unavailable')

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, gridSize, gridSize)

  const scale = Math.min(gridSize / 24, gridSize / 18)
  const renderW = 24 * scale
  const renderH = 18 * scale
  ctx.setTransform(scale, 0, 0, scale, (gridSize - renderW) / 2, (gridSize - renderH) / 2)
  ctx.fillStyle = '#fff'
  ctx.fill(new Path2D(WHALE_PATH))

  const { data } = ctx.getImageData(0, 0, gridSize, gridSize)
  const half = gridSize / 2
  const mask = new Float32Array(gridSize * gridSize)
  for (let i = 0; i < gridSize * gridSize; i++) {
    const idx = i * 4
    mask[i] = (data[idx]! * 0.299 + data[idx + 1]! * 0.587 + data[idx + 2]! * 0.114) / 255
  }

  const distMap = new Float32Array(gridSize * gridSize)
  let maxD = 1
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (mask[y * gridSize + x]! <= 0.2) continue
      let minDist = 999
      for (let ny = 0; ny < gridSize; ny += 2) {
        for (let nx = 0; nx < gridSize; nx += 2) {
          if (mask[ny * gridSize + nx]! <= 0.2) {
            const d = Math.hypot(x - nx, y - ny)
            if (d < minDist) minDist = d
          }
        }
      }
      distMap[y * gridSize + x] = minDist
      if (minDist > maxD && minDist < 900) maxD = minDist
    }
  }

  const positions: number[] = []
  const normals: number[] = []
  const scatteredPositions: number[] = []
  const opacities: number[] = []
  const edges: number[] = []
  const jitters: number[] = []

  const addParticle = (
    px: number,
    py: number,
    pz: number,
    nx: number,
    ny: number,
    nz: number,
    op: number,
    ed: number
  ) => {
    positions.push(px, py, pz)
    normals.push(nx, ny, nz)
    opacities.push(op)
    edges.push(ed)

    jitters.push(
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08
    )

    const phi = Math.random() * Math.PI * 2
    const theta = Math.acos(2 * Math.random() - 1)
    const dist = 6.0 * (0.3 + 0.7 * Math.random())
    scatteredPositions.push(
      Math.sin(theta) * Math.cos(phi) * dist,
      Math.sin(theta) * Math.sin(phi) * dist,
      Math.cos(theta) * dist * 0.8
    )
  }

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const val = mask[y * gridSize + x] ?? 0
      if (val <= 0.2) continue

      const px = (x - half) * PARTICLE_SPACING
      const py = (half - y) * PARTICLE_SPACING
      const normD = Math.min(1.0, (distMap[y * gridSize + x] ?? 0) / maxD)
      const hFactor = Math.sqrt(normD)

      const spinePos = (px + 2.2) / 5.2
      const bodyProfile = Math.sin(Math.max(0.0, Math.min(Math.PI, spinePos * Math.PI)))
      const localMaxZ = hFactor * (0.35 + 0.75 * bodyProfile)

      let emptyNeighbors = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize || (mask[ny * gridSize + nx] ?? 0) <= 0.2) {
            emptyNeighbors++
          }
        }
      }
      const edgeFactor = emptyNeighbors / 8.0

      if (localMaxZ > 0.08) {
        const zFront = localMaxZ * (0.75 + 0.25 * Math.random())
        const nFront = new THREE.Vector3(0, py * 0.2, 1.0).normalize()
        addParticle(px, py, zFront, nFront.x, nFront.y, nFront.z, val, edgeFactor)

        const zBack = -localMaxZ * (0.75 + 0.25 * Math.random())
        const nBack = new THREE.Vector3(0, py * 0.2, -1.0).normalize()
        addParticle(px, py, zBack, nBack.x, nBack.y, nBack.z, val, edgeFactor)
      } else {
        const nEdge = new THREE.Vector3(px * 0.2, py * 0.2, (Math.random() - 0.5) * 0.4).normalize()
        addParticle(px, py, (Math.random() - 0.5) * 0.05, nEdge.x, nEdge.y, nEdge.z, val, edgeFactor)
      }
    }
  }

  return {
    count: positions.length / 3,
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    scatteredPositions: new Float32Array(scatteredPositions),
    opacities: new Float32Array(opacities),
    edges: new Float32Array(edges),
    jitters: new Float32Array(jitters)
  }
}

/** 顶点着色器 */
const VERTEX_SHADER = `
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

      // 舒缓有力的流线型尾摆推力
      float swimFreq = mix(1.3, 2.6, uWorking);
      float wavePhase = uTime * swimFreq - targetCenter.x * 0.9;

      float waveY = sin(wavePhase) * (0.03 + 0.22 * tailFactor);
      float waveZ = cos(wavePhase * 0.85) * (0.02 + 0.15 * tailFactor);

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

/** 片元着色器 */
const FRAGMENT_SHADER = `
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

const STORAGE_KEY = 'dsh-particle-whale:enabled'
const LAYER_ID = 'dsh-particle-whale-layer'
const STYLE_ID = 'dsh-particle-whale-glass-style'
const SETTINGS_NS = 'settings.particle-whale'

let activeCleanup: (() => void) | null = null
let triggerScatterAndAssembleFn: (() => void) | null = null

function readEnabled(): boolean {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (value === null) return true
    return value !== '0'
  } catch {
    return true
  }
}

function writeEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0')
  } catch {}
}

function checkIsDarkTheme(): boolean {
  if (typeof document === 'undefined') return true
  return document.body.hasAttribute('data-ds-dark-theme')
}

/** 注入轻微磨砂半透明样式 */
function injectGlassStyle() {
  let style = document.getElementById(STYLE_ID)
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    document.head.appendChild(style)
  }

  style.textContent = `
    /* 深色模式：轻微磨砂半透明对话栏 (88% 不透明度) */
    body[data-ds-dark-theme] {
      --dsw-specific-input-major: rgba(26, 28, 33, 0.88) !important;
    }
    body[data-ds-dark-theme] div[class*="InputBar_card"],
    body[data-ds-dark-theme] div[class*="card_"],
    body[data-ds-dark-theme] form[class*="card"] {
      background: rgba(26, 28, 33, 0.88) !important;
      backdrop-filter: blur(20px) saturate(140%) !important;
      -webkit-backdrop-filter: blur(20px) saturate(140%) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.30) !important;
    }

    /* 白天模式：轻微磨砂半透明对话栏 */
    body:not([data-ds-dark-theme]) {
      --dsw-specific-input-major: rgba(255, 255, 255, 0.88) !important;
    }
    body:not([data-ds-dark-theme]) div[class*="InputBar_card"],
    body:not([data-ds-dark-theme]) div[class*="card_"],
    body:not([data-ds-dark-theme]) form[class*="card"] {
      background: rgba(255, 255, 255, 0.88) !important;
      backdrop-filter: blur(20px) saturate(140%) !important;
      -webkit-backdrop-filter: blur(20px) saturate(140%) !important;
      border: 1px solid rgba(0, 0, 0, 0.08) !important;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05) !important;
    }

    div[class*="InputBar_root"] textarea {
      background: transparent !important;
    }
  `
}

function removeGlassStyle() {
  document.getElementById(STYLE_ID)?.remove()
}

/** 检测 Agent 工作状态 */
let isAgentWorkingCached = false
function updateAgentWorkingState() {
  if (typeof document === 'undefined') return

  const stopButton = document.querySelector(
    'button[aria-label*="停止"], button[aria-label*="Stop"], button[aria-label*="stop"], [aria-label*="停止生成"], [aria-label*="Stop generating"], [data-action="stop"]'
  )
  if (stopButton !== null) {
    isAgentWorkingCached = true
    return
  }

  const runningElement = document.querySelector(
    '[data-state="running"], [data-status="running"], [data-follow-end="true"], [data-variant="think"][data-state="running"], .is-streaming, .is-busy, [aria-busy="true"], [class*="TurnStatus"], [class*="running"]'
  )
  if (runningElement !== null) {
    isAgentWorkingCached = true
    return
  }

  const loadingElement = document.querySelector('[class*="CompactionCommandCard"], [class*="ModelRetry"]')
  isAgentWorkingCached = loadingElement !== null
}

function startWhaleAnimation(): () => void {
  stopWhaleAnimation()

  const probe = document.createElement('canvas')
  const gl = probe.getContext('webgl2') ?? probe.getContext('webgl')
  if (!gl) return () => {}

  injectGlassStyle()

  let layer = document.getElementById(LAYER_ID)
  if (!layer) {
    layer = document.createElement('div')
    layer.id = LAYER_ID
    Object.assign(layer.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '1000',
      pointerEvents: 'none',
      overflow: 'hidden',
      opacity: '0.75'
    })
    layer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(layer)
  } else {
    layer.style.opacity = '0.75'
  }

  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 15)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  layer.appendChild(renderer.domElement)

  const pixelData = generateVolumetricWhaleData(GRID_SIZE)
  const indexArray = new Float32Array(pixelData.count)
  for (let i = 0; i < pixelData.count; i++) indexArray[i] = i

  const geometry = new THREE.BoxGeometry(0.06, 0.06, 0.018)
  geometry.setAttribute('aOpacity', new THREE.InstancedBufferAttribute(pixelData.opacities, 1))
  geometry.setAttribute('aIndex', new THREE.InstancedBufferAttribute(indexArray, 1))
  geometry.setAttribute('aNormal', new THREE.InstancedBufferAttribute(pixelData.normals, 3))
  geometry.setAttribute('aScattered', new THREE.InstancedBufferAttribute(pixelData.scatteredPositions, 3))
  geometry.setAttribute('aEdge', new THREE.InstancedBufferAttribute(pixelData.edges, 1))
  geometry.setAttribute('aJitter', new THREE.InstancedBufferAttribute(pixelData.jitters, 3))

  let isDark = checkIsDarkTheme()

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    uniforms: {
      uTime: { value: 0 },
      uLightPos: { value: new THREE.Vector3(DIGITILE_LIGHT_DEFAULTS.x, DIGITILE_LIGHT_DEFAULTS.y, DIGITILE_LIGHT_DEFAULTS.z) },
      uLightRange: { value: DIGITILE_LIGHT_DEFAULTS.range },
      uShadeMin: { value: DIGITILE_LIGHT_DEFAULTS.shadeMin },
      uShadeMax: { value: DIGITILE_LIGHT_DEFAULTS.shadeMax },
      uColor: { value: new THREE.Color(isDark ? 0.72 : 0.18, isDark ? 0.82 : 0.38, isDark ? 0.98 : 0.88) },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseRadius: { value: DIGITILE_MOUSE_DEFAULTS.radius },
      uMouseStrength: { value: 0.7 },
      uMouseDistort: { value: DIGITILE_MOUSE_DEFAULTS.distort },
      uAssembly: { value: 0 },
      uLoose: { value: 1.0 },
      uScatter: { value: 0 },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
      uWorking: { value: 0.0 }
    }
  })

  const syncThemeStyle = () => {
    isDark = checkIsDarkTheme()
    material.uniforms.uIsDark.value = isDark ? 1.0 : 0.0
    material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    material.needsUpdate = true
    if (layer) {
      layer.style.mixBlendMode = isDark ? 'screen' : 'normal'
    }
  }
  syncThemeStyle()

  const themeObserver = new MutationObserver(() => {
    syncThemeStyle()
  })
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })

  const instancedMesh = new THREE.InstancedMesh(geometry, material, pixelData.count)
  const dummy = new THREE.Object3D()
  for (let i = 0; i < pixelData.count; i++) {
    dummy.position.set(
      pixelData.positions[i * 3]!,
      pixelData.positions[i * 3 + 1]!,
      pixelData.positions[i * 3 + 2]!
    )
    const randScale = 0.65 + 0.75 * Math.random()
    dummy.scale.set(randScale, randScale, randScale)
    dummy.updateMatrix()
    instancedMesh.setMatrixAt(i, dummy.matrix)
  }
  instancedMesh.instanceMatrix.needsUpdate = true

  const whaleGroup = new THREE.Group()
  whaleGroup.add(instancedMesh)
  scene.add(whaleGroup)

  const mouseState = {
    clientX: 999,
    clientY: 999,
    smoothX: 999,
    smoothY: 999,
    hasMoved: false
  }

  const onMouseMove = (e: MouseEvent) => {
    mouseState.hasMoved = true
    const ndcX = (e.clientX / window.innerWidth) * 2 - 1
    const ndcY = -(e.clientY / window.innerHeight) * 2 + 1
    const v = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera)
    const dir = v.sub(camera.position).normalize()
    const dist = -camera.position.z / dir.z
    const worldP = camera.position.clone().add(dir.multiplyScalar(dist))
    mouseState.clientX = worldP.x
    mouseState.clientY = worldP.y
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  const workingTimer = setInterval(() => {
    updateAgentWorkingState()
  }, 150)

  // 散开与重组动画状态机
  type AnimState = 'idle' | 'scattering' | 'assembling'
  let animState: AnimState = 'assembling'
  let animTimer = 0.0

  const triggerScatterAndAssemble = () => {
    animState = 'scattering'
    animTimer = 0.0
  }
  triggerScatterAndAssembleFn = triggerScatterAndAssemble

  const clock = new THREE.Clock()
  let currentWorking = 0.0
  let raf = 0

  const invMatrix = new THREE.Matrix4()
  const localMouse = new THREE.Vector3()

  // 3D 深度深海动力学控制器
  const swimAgent = {
    pos: new THREE.Vector3(0, 0, 0),
    yaw: Math.PI,
    pitch: 0,
    roll: 0,
    targetYaw: Math.PI,
    targetPitch: 0,
    targetDepth: 0,
    wanderInterval: 0
  }

  function smoothAngle(current: number, target: number, speed: number): number {
    let diff = target - current
    diff = Math.atan2(Math.sin(diff), Math.cos(diff))
    return current + diff * Math.min(1.0, speed)
  }

  const animate = () => {
    raf = requestAnimationFrame(animate)
    const delta = Math.min(clock.getDelta(), 0.05)
    const elapsed = clock.getElapsedTime()

    // 1. 散开与重组
    if (animState === 'scattering') {
      animTimer += delta
      const p = Math.min(1.0, animTimer / 0.35)
      const easeP = Math.sin(p * Math.PI * 0.5)
      material.uniforms.uScatter.value = easeP
      material.uniforms.uAssembly.value = 1.0 - easeP * 0.85

      if (p >= 1.0) {
        animState = 'assembling'
        animTimer = 0.0
      }
    } else if (animState === 'assembling') {
      animTimer += delta
      const p = Math.min(1.0, animTimer / 1.3)
      const easeIn = 1.0 - Math.pow(1.0 - p, 3)
      material.uniforms.uScatter.value = 1.0 - easeIn
      material.uniforms.uAssembly.value = easeIn

      if (p >= 1.0) {
        animState = 'idle'
        material.uniforms.uScatter.value = 0.0
        material.uniforms.uAssembly.value = 1.0
      }
    }

    const D = material.uniforms.uAssembly.value

    // 2. 工作状态过渡
    const targetWorking = isAgentWorkingCached ? 1.0 : 0.0
    const lerpRate = targetWorking > currentWorking ? 0.05 : 0.03
    currentWorking += (targetWorking - currentWorking) * lerpRate
    material.uniforms.uWorking.value = currentWorking
    material.uniforms.uTime.value = elapsed

    // 3. 【比例控制】：闲置时 1.0x，运行时平滑缩小至 0.30x
    const currentScaleFactor = (1.00 * (1.0 - currentWorking) + 0.30 * currentWorking) * (0.75 + 0.25 * D)
    whaleGroup.scale.setScalar(currentScaleFactor)

    // 4. 鼠标追踪阻尼
    if (mouseState.hasMoved) {
      mouseState.smoothX += (mouseState.clientX - mouseState.smoothX) * DIGITILE_MOUSE_DEFAULTS.decay
      mouseState.smoothY += (mouseState.clientY - mouseState.smoothY) * DIGITILE_MOUSE_DEFAULTS.decay
      invMatrix.copy(whaleGroup.matrixWorld).invert()
      localMouse.set(mouseState.smoothX, mouseState.smoothY, 0).applyMatrix4(invMatrix)
      material.uniforms.uMouse.value.set(localMouse.x, localMouse.y)

      const lightX = DIGITILE_LIGHT_DEFAULTS.x + mouseState.smoothX * 0.1
      material.uniforms.uLightPos.value.set(lightX, DIGITILE_LIGHT_DEFAULTS.y, DIGITILE_LIGHT_DEFAULTS.z)
    }

    // 5. 【动力学巡游计算】
    if (currentWorking > 0.01) {
      // 运行中：在右上角专属水域（X: 5.5 ~ 7.5, Y: 2.3 ~ 3.4）内持续流畅进行「微流线巡弋畅游」
      const cornerT = elapsed * 0.8
      // 优美的平滑 8 字形/椭圆巡游轨迹 (Continuous Ocean Looping in Top-Right)
      const cornerTargetX = 6.4 + Math.sin(cornerT) * 1.0
      const cornerTargetY = 2.85 + Math.sin(cornerT * 2.0) * 0.40
      const cornerTargetZ = Math.cos(cornerT) * 0.30

      // 平滑朝向右上角游动点过渡
      const easeFactor = 0.06 * currentWorking
      swimAgent.pos.x += (cornerTargetX - swimAgent.pos.x) * easeFactor
      swimAgent.pos.y += (cornerTargetY - swimAgent.pos.y) * easeFactor
      swimAgent.pos.z += (cornerTargetZ - swimAgent.pos.z) * easeFactor

      // 实时速度切线向量，驱动自然航向（持续前向畅游）
      const cornerVx = Math.cos(cornerT) * 1.0 * 0.8
      const cornerVy = 2.0 * Math.cos(cornerT * 2.0) * 0.40 * 0.8
      const targetYawCorner = Math.atan2(cornerVy, cornerVx)

      swimAgent.yaw = smoothAngle(swimAgent.yaw, targetYawCorner, 0.06)
      swimAgent.pitch += (cornerVy * 0.4 - swimAgent.pitch) * 0.06

      // 转向时的优雅侧倾
      let dYawCorner = targetYawCorner - swimAgent.yaw
      dYawCorner = Math.atan2(Math.sin(dYawCorner), Math.cos(dYawCorner))
      swimAgent.roll += (-dYawCorner * 0.6 - swimAgent.roll) * 0.06

    } else {
      // 闲置状态：在全屏广阔大洋中自由前向巡游
      const boundX = 8.5
      const boundY = 3.8
      const boundZ = 3.2

      swimAgent.wanderInterval += delta
      if (swimAgent.wanderInterval > 5.0) {
        swimAgent.wanderInterval = 0
        swimAgent.targetPitch = (Math.random() - 0.5) * 0.5
        swimAgent.targetDepth = (Math.random() - 0.5) * boundZ
        swimAgent.targetYaw += (Math.random() - 0.5) * 0.8
      }

      // 边界规避（柔和转弯）
      if (swimAgent.pos.x < -boundX) {
        swimAgent.targetYaw = 0.0 + (Math.random() - 0.5) * 0.3
      } else if (swimAgent.pos.x > boundX) {
        swimAgent.targetYaw = Math.PI + (Math.random() - 0.5) * 0.3
      }

      if (swimAgent.pos.y < -boundY) {
        swimAgent.targetPitch = 0.35
      } else if (swimAgent.pos.y > boundY) {
        swimAgent.targetPitch = -0.35
      }

      // 最短弧度平滑航向
      swimAgent.yaw = smoothAngle(swimAgent.yaw, swimAgent.targetYaw, 0.5 * delta)
      swimAgent.pitch += (swimAgent.targetPitch - swimAgent.pitch) * 0.5 * delta

      let dYaw = swimAgent.targetYaw - swimAgent.yaw
      dYaw = Math.atan2(Math.sin(dYaw), Math.cos(dYaw))
      const targetRoll = -dYaw * 0.8
      swimAgent.roll += (targetRoll - swimAgent.roll) * 0.05

      // 前向巡游推进
      const forwardSpeed = 0.95 * delta
      swimAgent.pos.x += Math.cos(swimAgent.yaw) * Math.cos(swimAgent.pitch) * forwardSpeed
      swimAgent.pos.y += Math.sin(swimAgent.pitch) * forwardSpeed

      const dZ = swimAgent.targetDepth - swimAgent.pos.z
      swimAgent.pos.z += dZ * 0.015 + Math.sin(elapsed * 0.4) * 0.004
    }

    // 更新 3D 姿态与位置
    whaleGroup.position.copy(swimAgent.pos)

    whaleGroup.rotation.set(
      swimAgent.roll,
      -(swimAgent.yaw - Math.PI),
      swimAgent.pitch,
      'ZYX'
    )

    // 6. 颜色更新
    if (isDark) {
      const r = (0.72 - 0.50 * currentWorking) * D
      const g = (0.82 + 0.15 * currentWorking) * D
      const b = (0.98 + 0.02 * currentWorking) * D
      material.uniforms.uColor.value.setRGB(r, g, b)
    } else {
      material.uniforms.uColor.value.setRGB(0.18, 0.38, 0.88)
    }

    renderer.render(scene, camera)
  }

  if (reducedMotion) {
    material.uniforms.uAssembly.value = 1
    renderer.render(scene, camera)
  } else {
    raf = requestAnimationFrame(animate)
  }

  // 7. 新建会话散开重组
  let lastClickTime = 0
  const onNewChatClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const isNewChatBtn = Boolean(
      target.closest(
        'button[aria-label*="新建"], button[aria-label*="新会话"], button[aria-label*="New"], [data-action="new-session"], [data-action="create-session"], [data-action="new-chat"], [aria-label*="新建会话"], [aria-label*="New Chat"], [aria-label*="New Session"]'
      ) ||
      (target.textContent && (
        target.textContent.trim() === '新会话' ||
        target.textContent.trim() === '新建会话' ||
        target.textContent.trim() === 'New Chat' ||
        target.textContent.trim() === 'New Session'
      ))
    )

    if (isNewChatBtn) {
      const now = performance.now()
      if (now - lastClickTime < 400) return
      lastClickTime = now
      triggerScatterAndAssemble()
    }
  }
  window.addEventListener('click', onNewChatClick, true)

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'n' || e.key === 'N')) {
      triggerScatterAndAssemble()
    }
  }
  window.addEventListener('keydown', onKeyDown, true)

  const cleanup = () => {
    cancelAnimationFrame(raf)
    clearInterval(workingTimer)
    themeObserver.disconnect()
    removeGlassStyle()
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('click', onNewChatClick, true)
    window.removeEventListener('keydown', onKeyDown, true)
    whaleGroup.clear()
    scene.clear()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    renderer.domElement?.remove()
    layer?.remove()
    triggerScatterAndAssembleFn = null
    if (activeCleanup === cleanup) activeCleanup = null
  }

  activeCleanup = cleanup
  return cleanup
}

function stopWhaleAnimation(): void {
  if (activeCleanup) {
    activeCleanup()
    activeCleanup = null
  }
}

// UI 语言包
const zh = {
  title: '3D 粒子鲸鱼',
  hint: 'DeepSeek 官网同款 3D 粒子鲸鱼（闲置全屏巡游、思考时右上角小巧游弋、新建会话散开重组）。',
  open: '开启',
  close: '关闭',
  statusOn: '已开启'
}

const en = {
  title: '3D Particle Whale',
  hint: 'Authentic 3D particle whale (Widescreen roaming when idle, actively swims in top-right corner when working).',
  open: 'Turn on',
  close: 'Turn off',
  statusOn: 'On'
}

const styles: Record<string, any> = {
  row: {
    borderBottom: '1px solid var(--dsw-alias-border-l2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px 0'
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  title: {
    color: 'var(--dsw-alias-label-primary)',
    fontSize: '14px',
    lineHeight: '22px'
  },
  hint: {
    color: 'var(--dsw-alias-label-tertiary)',
    fontSize: '12px',
    lineHeight: '18px'
  },
  swatch: {
    width: '18px',
    height: '18px',
    borderRadius: '999px',
    background: '#4D6BFE',
    flexShrink: 0
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statusDot: {
    width: '7px',
    height: '7px',
    borderRadius: '999px',
    background: 'var(--dsw-alias-state-success-primary)',
    flexShrink: 0,
    display: 'inline-block'
  },
  btnOpen: {
    height: '36px',
    padding: '0 14px',
    border: 'none',
    borderRadius: '18px',
    cursor: 'pointer',
    font: 'inherit',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'inline-flex',
    alignItems: 'center',
    background: '#4D6BFE',
    color: '#ffffff'
  },
  btnClose: {
    height: '36px',
    padding: '0 14px',
    border: 'none',
    borderRadius: '18px',
    cursor: 'pointer',
    font: 'inherit',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'inline-flex',
    alignItems: 'center',
    background: 'var(--dsw-alias-bg-module-platform)',
    color: 'var(--dsw-alias-label-primary)'
  }
}

export const inject = ['slots', 'locale']

export function apply(ctx: any) {
  let bound: any
  let revision = 0

  const sync = (enabled: boolean) => {
    revision += 1
    bound?.sync(enabled, revision)
  }

  const setWhaleEnabled = (enabled: boolean) => {
    writeEnabled(enabled)
    if (enabled) {
      startWhaleAnimation()
    } else {
      stopWhaleAnimation()
    }
    sync(enabled)
  }

  if (readEnabled()) {
    startWhaleAnimation()
  }

  ctx.effect(() => () => {
    stopWhaleAnimation()
  }, 'dsh-particle-whale: teardown')

  ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), 'dsh-particle-whale: locale')

  try {
    let defineStore: any
    try {
      defineStore = require('@deepseek-ai/dsh-client-runtime/client').defineStore
    } catch {
      defineStore = (desc: any) => desc
    }

    const store = defineStore({
      init: () => ({
        enabled: readEnabled(),
        revision: -1
      }),
      actions: {
        sync: (d: any, enabled: boolean, rev: number) => {
          if (rev <= d.revision) return
          d.enabled = enabled
          d.revision = rev
        }
      }
    })

    const jsxRuntime = require('react/jsx-runtime')

    function EnabledRow({ t, setEnabled, useStore }: any) {
      const enabled = useStore((s: any) => s.enabled)
      return jsxRuntime.jsxs('div', {
        style: styles.row,
        children: [
          jsxRuntime.jsxs('div', {
            style: styles.head,
            children: [
              jsxRuntime.jsxs('div', {
                style: styles.titleGroup,
                children: [
                  jsxRuntime.jsx('span', { style: styles.swatch, 'aria-hidden': true }),
                  jsxRuntime.jsx('div', {
                    style: styles.title,
                    children: t('title')
                  }),
                  enabled ? jsxRuntime.jsx('span', {
                    style: styles.statusDot,
                    title: t('statusOn'),
                    'aria-label': t('statusOn')
                  }) : null
                ]
              }),
              jsxRuntime.jsx('button', {
                type: 'button',
                style: enabled ? styles.btnClose : styles.btnOpen,
                'aria-pressed': enabled,
                onClick: () => setWhaleEnabled(!enabled),
                children: enabled ? t('close') : t('open')
              })
            ]
          }),
          jsxRuntime.jsx('div', {
            style: styles.hint,
            children: t('hint')
          })
        ]
      })
    }

    ctx.slots.inject('settings.general.item', () =>
      ctx.slots.register(
        {
          name: 'settings.general.item',
          id: 'particle-whale',
          order: 22,
          store,
          locale: SETTINGS_NS,
          inject: (actions: any) => {
            bound = actions
            sync(readEnabled())
            return {
              setEnabled: setWhaleEnabled
            }
          }
        },
        EnabledRow
      )
    )
  } catch (err) {
    console.error('[dsh-particle-whale] failed to register settings slot:', err)
  }
}
