import * as THREE from 'three'
import { UserWhaleConfig } from '../types'
import {
  DIGITILE_LIGHT_DEFAULTS,
  DIGITILE_MOUSE_DEFAULTS,
  GRID_SIZE,
  LAYER_ID,
  POPUP_ID
} from '../constants'
import { WHALE_VERTEX_SHADER, WHALE_FRAGMENT_SHADER } from '../shaders/whale.glsl'
import { GALAXY_VERTEX_SHADER, GALAXY_FRAGMENT_SHADER } from '../shaders/galaxy.glsl'
import { generateVolumetricWhaleData } from '../geometry/whaleData'
import { generateGalaxyData } from '../geometry/galaxyData'
import { checkIsDarkTheme, checkIsHeroScreen, checkIsAgentWorking } from './stateDetector'
import { injectCustomStyles, removeCustomStyles } from '../ui/styles'
import { removeSidebarQuickButton } from '../ui/sidebarButton'

let activeCleanup: (() => void) | null = null

function smoothAngle(current: number, target: number, speed: number): number {
  let diff = target - current
  diff = Math.atan2(Math.sin(diff), Math.cos(diff))
  return current + diff * Math.min(1.0, speed)
}

/**
 * 将屏幕像素坐标 (px, py) 准确反投影到 3D 世界坐标系中 Z = targetZ 的平面
 */
function getScreenWorldPos(
  camera: THREE.PerspectiveCamera,
  pixelX: number,
  pixelY: number,
  targetZ: number = 0
): THREE.Vector3 {
  const ndcX = (pixelX / window.innerWidth) * 2 - 1
  const ndcY = -(pixelY / window.innerHeight) * 2 + 1
  const v = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera)
  const dir = v.sub(camera.position).normalize()
  const dist = (targetZ - camera.position.z) / dir.z
  return camera.position.clone().add(dir.multiplyScalar(dist))
}

/**
 * 启动 3D 粒子鲸鱼与星河背景动画
 */
export function startWhaleAnimation(currentConfig: UserWhaleConfig): () => void {
  stopWhaleAnimation()

  const probe = document.createElement('canvas')
  const gl = probe.getContext('webgl2') ?? probe.getContext('webgl')
  if (!gl) return () => {}

  injectCustomStyles(currentConfig)

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
      opacity: `${0.80 * currentConfig.brightness}`
    })
    layer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(layer)
  } else {
    layer.style.opacity = `${0.80 * currentConfig.brightness}`
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

  // 1. 创建星河背景 Points
  const galaxyGeometry = generateGalaxyData(800)
  const galaxyMaterial = new THREE.ShaderMaterial({
    vertexShader: GALAXY_VERTEX_SHADER,
    fragmentShader: GALAXY_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: currentConfig.galaxy ? 0.65 : 0.0 }
    }
  })
  const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial)
  scene.add(galaxyPoints)

  // 2. 创建 3D 粒子鲸鱼
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
    vertexShader: WHALE_VERTEX_SHADER,
    fragmentShader: WHALE_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    uniforms: {
      uTime: { value: 0 },
      uLightPos: { value: new THREE.Vector3(DIGITILE_LIGHT_DEFAULTS.x, DIGITILE_LIGHT_DEFAULTS.y, DIGITILE_LIGHT_DEFAULTS.z) },
      uLightRange: { value: DIGITILE_LIGHT_DEFAULTS.range },
      uShadeMin: { value: DIGITILE_LIGHT_DEFAULTS.shadeMin },
      uShadeMax: { value: DIGITILE_LIGHT_DEFAULTS.shadeMax * currentConfig.brightness },
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
    if (galaxyMaterial) {
      galaxyMaterial.uniforms.uOpacity.value = currentConfig.galaxy ? (isDark ? 0.65 : 0.20) : 0.0
    }
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

  let isAgentWorkingCached = false
  let isHeroScreenCached = checkIsHeroScreen()

  const updateAppState = () => {
    if (typeof document === 'undefined') return
    isHeroScreenCached = checkIsHeroScreen()
    isAgentWorkingCached = checkIsAgentWorking()
  }

  updateAppState()
  const stateTimer = setInterval(updateAppState, 120)

  // 散开与重组动画状态机
  type AnimState = 'idle' | 'scattering' | 'assembling'
  let animState: AnimState = 'assembling'
  let animTimer = 0.0

  const triggerScatterAndAssemble = () => {
    animState = 'scattering'
    animTimer = 0.0
  }

  const clock = new THREE.Clock()
  let currentWorking = 0.0
  let currentHeroProgress = isHeroScreenCached ? 1.0 : 0.0
  let raf = 0

  const invMatrix = new THREE.Matrix4()
  const localMouse = new THREE.Vector3()

  // 3D 深度深海动力学控制器初始点
  const initialWorldPos = getScreenWorldPos(camera, 120, window.innerHeight - 100)
  const swimAgent = {
    pos: initialWorldPos.clone(),
    yaw: Math.PI,
    pitch: 0,
    roll: 0,
    targetYaw: Math.PI,
    targetPitch: 0
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

    // 2. 更新星河背景
    if (galaxyMaterial) {
      galaxyMaterial.uniforms.uTime.value = elapsed
      const targetGalaxyOpacity = currentConfig.galaxy ? (isDark ? 0.65 : 0.20) : 0.0
      galaxyMaterial.uniforms.uOpacity.value += (targetGalaxyOpacity - galaxyMaterial.uniforms.uOpacity.value) * 0.05
      
      if (mouseState.hasMoved) {
        galaxyPoints.position.x = mouseState.smoothX * 0.03
        galaxyPoints.position.y = mouseState.smoothY * 0.03
      }
    }

    // 3. 场景状态平滑过渡：严格 Hero (1.0) vs 对话窗口 (0.0)
    const targetHero = isHeroScreenCached ? 1.0 : 0.0
    currentHeroProgress += (targetHero - currentHeroProgress) * 0.08

    const targetWorking = isAgentWorkingCached ? 1.0 : 0.0
    const lerpRate = targetWorking > currentWorking ? 0.06 : 0.03
    currentWorking += (targetWorking - currentWorking) * lerpRate
    material.uniforms.uWorking.value = currentWorking
    material.uniforms.uTime.value = elapsed

    // 4. 【尺寸计算】：主界面为 1.0x（宏伟），对话窗口直接缩小为 0.18x（极致袖珍灵宠）
    const baseScale = 1.00 * currentHeroProgress + 0.18 * (1.0 - currentHeroProgress)
    const currentScaleFactor = baseScale * currentConfig.scale * (0.75 + 0.25 * D)
    whaleGroup.scale.setScalar(currentScaleFactor)

    // 5. 鼠标追踪阻尼
    if (mouseState.hasMoved) {
      mouseState.smoothX += (mouseState.clientX - mouseState.smoothX) * DIGITILE_MOUSE_DEFAULTS.decay
      mouseState.smoothY += (mouseState.clientY - mouseState.smoothY) * DIGITILE_MOUSE_DEFAULTS.decay
      invMatrix.copy(whaleGroup.matrixWorld).invert()
      localMouse.set(mouseState.smoothX, mouseState.smoothY, 0).applyMatrix4(invMatrix)
      material.uniforms.uMouse.value.set(localMouse.x, localMouse.y)

      const lightX = DIGITILE_LIGHT_DEFAULTS.x + mouseState.smoothX * 0.1
      material.uniforms.uLightPos.value.set(lightX, DIGITILE_LIGHT_DEFAULTS.y, DIGITILE_LIGHT_DEFAULTS.z)
    }

    // 6. 【精确屏幕像素反投影与动力学姿态】
    const userSpeedMult = currentConfig.speed
    if (currentHeroProgress > 0.5) {
      // =====【主界面 (Hero) 状态】：主视觉区偏右停驻，微幅呼吸 =====
      const heroPixelX = window.innerWidth * 0.58
      const heroPixelY = window.innerHeight * 0.48 + Math.sin(elapsed * 0.5) * 8
      const heroWorld = getScreenWorldPos(camera, heroPixelX, heroPixelY, 0)

      const easeFactor = 0.08 * currentHeroProgress
      swimAgent.pos.x += (heroWorld.x - swimAgent.pos.x) * easeFactor
      swimAgent.pos.y += (heroWorld.y - swimAgent.pos.y) * easeFactor
      swimAgent.pos.z += (heroWorld.z - swimAgent.pos.z) * easeFactor

      swimAgent.yaw = smoothAngle(swimAgent.yaw, Math.PI, 0.08)
      swimAgent.pitch += (0.0 - swimAgent.pitch) * 0.08
      swimAgent.roll += (0.0 - swimAgent.roll) * 0.08

    } else {
      // =====【对话窗口 (Chat) 状态】：严格反投影至屏幕真实「左下角」=====
      // 探测当前侧边栏真实宽度（收起时 ~56px，展开时 ~240px）
      const sidebarEl = document.querySelector('aside, [class*="SidebarRoot_root"], [class*="sidebar"]')
      const sidebarRight = sidebarEl ? sidebarEl.getBoundingClientRect().right : 56

      // 目标像素点：紧邻侧栏右侧 70px，底部往上 95px（处于输入栏左侧安全空白水域）
      const targetPixelX = sidebarRight + 70
      const targetPixelY = window.innerHeight - 95
      const baseCornerWorld = getScreenWorldPos(camera, targetPixelX, targetPixelY, 0)

      const cornerT = elapsed * 0.70 * userSpeedMult
      const blTargetX = baseCornerWorld.x + Math.sin(cornerT) * 0.25
      const blTargetY = baseCornerWorld.y + Math.sin(cornerT * 2.0) * 0.12
      const blTargetZ = Math.cos(cornerT) * 0.10

      const easeFactor = 0.08 * (1.0 - currentHeroProgress)
      swimAgent.pos.x += (blTargetX - swimAgent.pos.x) * easeFactor
      swimAgent.pos.y += (blTargetY - swimAgent.pos.y) * easeFactor
      swimAgent.pos.z += (blTargetZ - swimAgent.pos.z) * easeFactor

      const blVx = Math.cos(cornerT) * 0.25 * 0.70
      const blVy = 2.0 * Math.cos(cornerT * 2.0) * 0.12 * 0.70
      const targetYawCorner = Math.atan2(blVy, blVx)

      swimAgent.yaw = smoothAngle(swimAgent.yaw, targetYawCorner, 0.06)
      swimAgent.pitch += (blVy * 0.4 - swimAgent.pitch) * 0.06

      let dYawCorner = targetYawCorner - swimAgent.yaw
      dYawCorner = Math.atan2(Math.sin(dYawCorner), Math.cos(dYawCorner))
      swimAgent.roll += (-dYawCorner * 0.6 - swimAgent.roll) * 0.06
    }

    whaleGroup.position.copy(swimAgent.pos)
    whaleGroup.rotation.set(
      swimAgent.roll,
      -(swimAgent.yaw - Math.PI),
      swimAgent.pitch,
      'ZYX'
    )

    // 7. 颜色与发光
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

  // 8. 新建会话散开重组
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
    clearInterval(stateTimer)
    themeObserver.disconnect()
    removeCustomStyles()
    removeSidebarQuickButton()
    document.getElementById(POPUP_ID)?.remove()
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('click', onNewChatClick, true)
    window.removeEventListener('keydown', onKeyDown, true)
    whaleGroup.clear()
    scene.clear()
    geometry.dispose()
    material.dispose()
    galaxyGeometry.dispose()
    galaxyMaterial.dispose()
    renderer.dispose()
    renderer.domElement?.remove()
    layer?.remove()
    if (activeCleanup === cleanup) activeCleanup = null
  }

  activeCleanup = cleanup
  return cleanup
}

export function stopWhaleAnimation(): void {
  if (activeCleanup) {
    activeCleanup()
    activeCleanup = null
  }
}
