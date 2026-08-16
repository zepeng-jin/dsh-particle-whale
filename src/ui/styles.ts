import { UserWhaleConfig } from '../types'
import { STYLE_ID, BTN_ID } from '../constants'

/**
 * 动态注入自定义毛玻璃与输入框微透样式
 */
export function injectCustomStyles(cfg: UserWhaleConfig): void {
  let style = document.getElementById(STYLE_ID)
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    document.head.appendChild(style)
  }

  const blurPx = Math.round(cfg.inputOpacity * 24)

  style.textContent = `
    div[class*="footerActions"] {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
    }
    
    #${BTN_ID} {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 36px !important;
      height: 36px !important;
      margin: 0 auto 8px !important;
      border-radius: 50% !important;
    }

    body[data-ds-dark-theme] {
      --dsw-specific-input-major: rgba(26, 28, 33, ${cfg.inputOpacity}) !important;
    }
    body[data-ds-dark-theme] div[class*="InputBar_card"],
    body[data-ds-dark-theme] div[class*="card_"],
    body[data-ds-dark-theme] form[class*="card"] {
      background: rgba(26, 28, 33, ${cfg.inputOpacity}) !important;
      backdrop-filter: blur(${blurPx}px) saturate(140%) !important;
      -webkit-backdrop-filter: blur(${blurPx}px) saturate(140%) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.30) !important;
    }

    body:not([data-ds-dark-theme]) {
      --dsw-specific-input-major: rgba(255, 255, 255, ${cfg.inputOpacity}) !important;
    }
    body:not([data-ds-dark-theme]) div[class*="InputBar_card"],
    body:not([data-ds-dark-theme]) div[class*="card_"],
    body:not([data-ds-dark-theme]) form[class*="card"] {
      background: rgba(255, 255, 255, ${cfg.inputOpacity}) !important;
      backdrop-filter: blur(${blurPx}px) saturate(140%) !important;
      -webkit-backdrop-filter: blur(${blurPx}px) saturate(140%) !important;
      border: 1px solid rgba(0, 0, 0, 0.08) !important;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05) !important;
    }

    div[class*="InputBar_root"] textarea {
      background: transparent !important;
    }
  `
}

/**
 * 移除自定义毛玻璃样式
 */
export function removeCustomStyles(): void {
  document.getElementById(STYLE_ID)?.remove()
}
