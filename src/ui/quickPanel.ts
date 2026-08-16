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
  
  const leftPos = Math.max(52, rect.right + 12)
  const bottomPos = Math.max(16, window.innerHeight - rect.bottom - 10)

  Object.assign(panel.style, {
    position: 'fixed',
    left: `${leftPos}px`,
    bottom: `${bottomPos}px`,
    width: '286px',
    zIndex: '10000',
    background: isDark ? 'rgba(24, 27, 34, 0.94)' : 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(28px) saturate(180%)',
    WebkitBackdropFilter: 'blur(28px) saturate(180%)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '16px',
    boxShadow: '0 20px 48px 0 rgba(0, 0, 0, 0.40)',
    padding: '18px',
    boxSizing: 'border-box',
    color: isDark ? '#f1f5f9' : '#0f172a',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    animation: 'popover-in 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
  })

  // 注入滑块专属流畅拖拽样式
  const sliderStyleId = 'whale-slider-style'
  if (!document.getElementById(sliderStyleId)) {
    const s = document.createElement('style')
    s.id = sliderStyleId
    s.textContent = `
      .whale-slider {
        -webkit-appearance: none !important;
        appearance: none !important;
        width: 100% !important;
        height: 6px !important;
        border-radius: 3px !important;
        background: rgba(148, 163, 184, 0.25) !important;
        outline: none !important;
        cursor: pointer !important;
        margin: 4px 0 !important;
        transition: background 0.15s ease !important;
      }
      .whale-slider:hover {
        background: rgba(148, 163, 184, 0.35) !important;
      }
      .whale-slider::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        appearance: none !important;
        width: 18px !important;
        height: 18px !important;
        border-radius: 50% !important;
        background: #4D6BFE !important;
        cursor: grab !important;
        box-shadow: 0 2px 8px rgba(77, 107, 254, 0.45) !important;
        transition: transform 0.1s ease, background-color 0.15s ease !important;
      }
      .whale-slider::-webkit-slider-thumb:hover {
        transform: scale(1.18) !important;
        background: #6380fe !important;
      }
      .whale-slider:active::-webkit-slider-thumb {
        cursor: grabbing !important;
        transform: scale(1.25) !important;
        box-shadow: 0 0 0 6px rgba(77, 107, 254, 0.2) !important;
      }
    `
    document.head.appendChild(s)
  }

  panel.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; padding-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px;">
        <span style="font-size: 16px;">🐳</span>
        <span>3D 鲸鱼与星河调节</span>
      </div>
      <button id="whale-cfg-close" style="background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 16px; padding: 0 4px; border-radius: 4px;">✕</button>
    </div>

    <!-- 1. 鲸鱼总开关 & 星河开关 -->
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 13px; color: ${isDark ? '#94a3b8' : '#64748b'};">3D 粒子鲸鱼</span>
      <button id="whale-cfg-enabled" style="height: 26px; padding: 0 12px; border-radius: 13px; border: none; font-size: 12px; font-weight: 500; cursor: pointer; background: ${currentConfig.enabled ? '#4D6BFE' : (isDark ? '#334155' : '#cbd5e1')}; color: #fff; transition: background 0.2s;">
        ${currentConfig.enabled ? '已开启' : '已关闭'}
      </button>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 13px; color: ${isDark ? '#94a3b8' : '#64748b'};">🌌 浩瀚星河背景</span>
      <button id="whale-cfg-galaxy" style="height: 26px; padding: 0 12px; border-radius: 13px; border: none; font-size: 12px; font-weight: 500; cursor: pointer; background: ${currentConfig.galaxy ? '#4D6BFE' : (isDark ? '#334155' : '#cbd5e1')}; color: #fff; transition: background 0.2s;">
        ${currentConfig.galaxy ? '已开启' : '已关闭'}
      </button>
    </div>

    <!-- 2. 鲸鱼体型尺寸 -->
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">鲸鱼体型缩放</span>
        <span id="val-scale" style="color: #4D6BFE; font-weight: 600;">${Math.round(currentConfig.scale * 100)}%</span>
      </div>
      <input id="slider-scale" class="whale-slider" type="range" min="40" max="180" value="${Math.round(currentConfig.scale * 100)}" />
    </div>

    <!-- 3. 发光亮度 -->
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">发光亮度</span>
        <span id="val-brightness" style="color: #4D6BFE; font-weight: 600;">${Math.round(currentConfig.brightness * 100)}%</span>
      </div>
      <input id="slider-brightness" class="whale-slider" type="range" min="30" max="180" value="${Math.round(currentConfig.brightness * 100)}" />
    </div>

    <!-- 4. 对话框透明度 -->
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">对话输入框微透度</span>
        <span id="val-input-opacity" style="color: #4D6BFE; font-weight: 600;">${Math.round(currentConfig.inputOpacity * 100)}%</span>
      </div>
      <input id="slider-input-opacity" class="whale-slider" type="range" min="30" max="100" value="${Math.round(currentConfig.inputOpacity * 100)}" />
    </div>

    <!-- 5. 游动巡游速度 -->
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">游弋巡航速度</span>
        <span id="val-speed" style="color: #4D6BFE; font-weight: 600;">${currentConfig.speed.toFixed(1)}x</span>
      </div>
      <input id="slider-speed" class="whale-slider" type="range" min="5" max="20" value="${Math.round(currentConfig.speed * 10)}" />
    </div>
  `

  // 阻止冒泡避免被全局窗口捕获关闭或干扰拖拽
  panel.onmousedown = (e) => e.stopPropagation()
  panel.onpointerdown = (e) => e.stopPropagation()
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

  // 监听并绑定每个滑块的实时平滑响应
  const bindSlider = (id: string, valId: string, format: (val: number) => string, updateCfg: (val: number) => void) => {
    const slider = panel.querySelector(id) as HTMLInputElement
    if (!slider) return
    
    const handler = () => {
      const v = Number(slider.value)
      panel.querySelector(valId)!.textContent = format(v)
      updateCfg(v)
      saveConfig(currentConfig)
      onConfigChange(currentConfig)
    }

    slider.addEventListener('input', handler)
    slider.addEventListener('change', handler)
  }

  bindSlider('#slider-scale', '#val-scale', (v) => `${v}%`, (v) => { currentConfig.scale = v / 100 })
  bindSlider('#slider-brightness', '#val-brightness', (v) => `${v}%`, (v) => { currentConfig.brightness = v / 100 })
  bindSlider('#slider-input-opacity', '#val-input-opacity', (v) => `${v}%`, (v) => { currentConfig.inputOpacity = v / 100 })
  bindSlider('#slider-speed', '#val-speed', (v) => `${(v / 10).toFixed(1)}x`, (v) => { currentConfig.speed = v / 10 })

  const onOutsideClick = (e: MouseEvent) => {
    if (!panel.contains(e.target as Node) && e.target !== anchorBtn) {
      panel.remove()
      window.removeEventListener('click', onOutsideClick, true)
    }
  }
  setTimeout(() => {
    window.addEventListener('click', onOutsideClick, true)
  }, 100)
}
