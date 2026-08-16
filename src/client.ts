import { UserWhaleConfig } from './types'
import { DEFAULT_CONFIG, STORAGE_KEY, LAYER_ID, POPUP_ID } from './constants'
import { injectCustomStyles } from './ui/styles'
import { injectSidebarQuickButton, removeSidebarQuickButton } from './ui/sidebarButton'
import { toggleQuickControlPanel, saveConfig } from './ui/quickPanel'
import { startWhaleAnimation, stopWhaleAnimation } from './scene/whaleScene'
import { registerSettingsSlot } from './settingsSlot'

export const inject = ['slots', 'locale']

function loadConfig(): UserWhaleConfig {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return { ...DEFAULT_CONFIG }
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

/**
 * DSH 插件生命周期入口 (Cordis Plugin Entry)
 */
export function apply(ctx: any) {
  let currentConfig = loadConfig()

  // 1. 应用与更新配置
  const onApplyConfig = (cfg: UserWhaleConfig) => {
    currentConfig = cfg
    saveConfig(cfg)
    injectCustomStyles(cfg)

    const layer = document.getElementById(LAYER_ID)
    if (layer) {
      layer.style.opacity = `${0.80 * cfg.brightness}`
    }

    if (cfg.enabled) {
      startWhaleAnimation(currentConfig)
    } else {
      stopWhaleAnimation()
    }

    settingsHandle?.sync(cfg.enabled)
  }

  // 2. 初始化挂载样式、侧边栏快捷按钮与 3D 场景
  injectCustomStyles(currentConfig)

  injectSidebarQuickButton((anchorBtn) => {
    toggleQuickControlPanel(anchorBtn, currentConfig, onApplyConfig)
  })

  if (currentConfig.enabled) {
    startWhaleAnimation(currentConfig)
  }

  // 3. 注册通用设置项
  const settingsHandle = registerSettingsSlot(ctx, currentConfig, onApplyConfig)

  // 4. 插件卸载清理
  ctx.effect(() => () => {
    stopWhaleAnimation()
    removeSidebarQuickButton()
    document.getElementById(POPUP_ID)?.remove()
  }, 'dsh-particle-whale: teardown')
}
