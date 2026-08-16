import { UserWhaleConfig } from '../types'
import { POPUP_ID, STORAGE_KEY } from '../constants'
import { checkIsDarkTheme } from '../scene/stateDetector'

export function saveConfig(cfg: UserWhaleConfig): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
  } catch {}
}

/**
 * 渲染侧栏弹出的毛玻璃快捷调节浮窗 (Liquid Glass Popover Panel)
 */
export function toggleQuickControlPanel(
  anchorBtn: HTMLElement,
  currentConfig: UserWhaleConfig,
  onConfigChange: (cfg: UserWhaleConfig) => void
): void {
  let existing = document.getElementById(POPUP_ID)
  if (existing) {
    existing.remove()
    return
  }

  const isDark = checkIsDarkTheme()
  const rect = anchorBtn.getBoundingClientRect()
  const panel = document.createElement('div')
  panel.id = POPUP_ID
  
  const leftPos = Math.max(52, rect.right + 10)
  const bottomPos = Math.max(16, window.innerHeight - rect.bottom - 10)

  Object.assign(panel.style, {
    position: 'fixed',
    left: `${leftPos}px`,
    bottom: `${bottomPos}px`,
    width: '276px',
    zIndex: '10000',
    background: isDark ? 'rgba(28, 31, 38, 0.92)' : 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(24px) saturate(160%)',
    WebkitBackdropFilter: 'blur(24px) saturate(160%)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.10)',
    borderRadius: '14px',
    boxShadow: '0 16px 40px 0 rgba(0, 0, 0, 0.35)',
    padding: '16px',
    boxSizing: 'border-box',
    color: isDark ? '#f1f5f9' : '#0f172a',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    animation: 'popover-in 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
  })

  panel.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; padding-bottom: 10px;">
      <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px;">
        <span style="color: #4D6BFE;">🐳</span>
        <span>3D 鲸鱼与星河调节</span>
      </div>
      <button id="whale-cfg-close" style="background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 16px; padding: 0 4px;">✕</button>
    </div>

    <!-- 1. 鲸鱼总开关 & 星河开关 -->
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 12px; color: ${isDark ? '#94a3b8' : '#64748b'};">3D 粒子鲸鱼</span>
      <button id="whale-cfg-enabled" style="height: 24px; padding: 0 10px; border-radius: 12px; border: none; font-size: 12px; cursor: pointer; background: ${currentConfig.enabled ? '#4D6BFE' : (isDark ? '#334155' : '#cbd5e1')}; color: #fff;">
        ${currentConfig.enabled ? '已开启' : '已关闭'}
      </button>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 12px; color: ${isDark ? '#94a3b8' : '#64748b'};">🌌 浩瀚星河背景</span>
      <button id="whale-cfg-galaxy" style="height: 24px; padding: 0 10px; border-radius: 12px; border: none; font-size: 12px; cursor: pointer; background: ${currentConfig.galaxy ? '#4D6BFE' : (isDark ? '#334155' : '#cbd5e1')}; color: #fff;">
        ${currentConfig.galaxy ? '已开启' : '已关闭'}
      </button>
    </div>

    <!-- 2. 鲸鱼体型尺寸 -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">鲸鱼体型缩放</span>
        <span id="val-scale" style="color: #4D6BFE; font-weight: 600;">${Math.round(currentConfig.scale * 100)}%</span>
      </div>
      <input id="slider-scale" type="range" min="40" max="180" value="${Math.round(currentConfig.scale * 100)}" style="accent-color: #4D6BFE; cursor: pointer; width: 100%;" />
    </div>

    <!-- 3. 发光亮度 -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">发光亮度</span>
        <span id="val-brightness" style="color: #4D6BFE; font-weight: 600;">${Math.round(currentConfig.brightness * 100)}%</span>
      </div>
      <input id="slider-brightness" type="range" min="30" max="180" value="${Math.round(currentConfig.brightness * 100)}" style="accent-color: #4D6BFE; cursor: pointer; width: 100%;" />
    </div>

    <!-- 4. 对话框透明度 -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">对话输入框微透度</span>
        <span id="val-input-opacity" style="color: #4D6BFE; font-weight: 600;">${Math.round(currentConfig.inputOpacity * 100)}%</span>
      </div>
      <input id="slider-input-opacity" type="range" min="30" max="100" value="${Math.round(currentConfig.inputOpacity * 100)}" style="accent-color: #4D6BFE; cursor: pointer; width: 100%;" />
    </div>

    <!-- 5. 游动巡游速度 -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">游弋巡航速度</span>
        <span id="val-speed" style="color: #4D6BFE; font-weight: 600;">${currentConfig.speed.toFixed(1)}x</span>
      </div>
      <input id="slider-speed" type="range" min="5" max="20" value="${Math.round(currentConfig.speed * 10)}" style="accent-color: #4D6BFE; cursor: pointer; width: 100%;" />
    </div>
  `

  panel.onclick = (e) => e.stopPropagation()
  document.body.appendChild(panel)

  panel.querySelector('#whale-cfg-close')?.addEventListener('click', () => panel.remove())

  const btnToggle = panel.querySelector('#whale-cfg-enabled') as HTMLButtonElement
  btnToggle?.addEventListener('click', () => {
    currentConfig.enabled = !currentConfig.enabled
    btnToggle.textContent = currentConfig.enabled ? '已开启' : '已关闭'
    btnToggle.style.background = currentConfig.enabled ? '#4D6BFE' : (isDark ? '#334155' : '#cbd5e1')
    saveConfig(currentConfig)
    onConfigChange(currentConfig)
  })

  const btnGalaxy = panel.querySelector('#whale-cfg-galaxy') as HTMLButtonElement
  btnGalaxy?.addEventListener('click', () => {
    currentConfig.galaxy = !currentConfig.galaxy
    btnGalaxy.textContent = currentConfig.galaxy ? '已开启' : '已关闭'
    btnGalaxy.style.background = currentConfig.galaxy ? '#4D6BFE' : (isDark ? '#334155' : '#cbd5e1')
    saveConfig(currentConfig)
    onConfigChange(currentConfig)
  })

  const sliderScale = panel.querySelector('#slider-scale') as HTMLInputElement
  sliderScale?.addEventListener('input', () => {
    currentConfig.scale = Number(sliderScale.value) / 100
    panel.querySelector('#val-scale')!.textContent = `${sliderScale.value}%`
    saveConfig(currentConfig)
    onConfigChange(currentConfig)
  })

  const sliderBright = panel.querySelector('#slider-brightness') as HTMLInputElement
  sliderBright?.addEventListener('input', () => {
    currentConfig.brightness = Number(sliderBright.value) / 100
    panel.querySelector('#val-brightness')!.textContent = `${sliderBright.value}%`
    saveConfig(currentConfig)
    onConfigChange(currentConfig)
  })

  const sliderOpacity = panel.querySelector('#slider-input-opacity') as HTMLInputElement
  sliderOpacity?.addEventListener('input', () => {
    currentConfig.inputOpacity = Number(sliderOpacity.value) / 100
    panel.querySelector('#val-input-opacity')!.textContent = `${sliderOpacity.value}%`
    saveConfig(currentConfig)
    onConfigChange(currentConfig)
  })

  const sliderSpeed = panel.querySelector('#slider-speed') as HTMLInputElement
  sliderSpeed?.addEventListener('input', () => {
    currentConfig.speed = Number(sliderSpeed.value) / 10
    panel.querySelector('#val-speed')!.textContent = `${currentConfig.speed.toFixed(1)}x`
    saveConfig(currentConfig)
    onConfigChange(currentConfig)
  })

  const onOutsideClick = (e: MouseEvent) => {
    if (!panel.contains(e.target as Node) && e.target !== anchorBtn) {
      panel.remove()
      window.removeEventListener('click', onOutsideClick, true)
    }
  }
  setTimeout(() => {
    window.addEventListener('click', onOutsideClick, true)
  }, 50)
}
