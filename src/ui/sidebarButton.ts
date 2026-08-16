import { BTN_ID } from '../constants'

/**
 * 动态自适应挂载到侧边栏原生 footerActions 容器正中央 (100% 居中)
 */
export function injectSidebarQuickButton(onTogglePanel: (anchorBtn: HTMLElement) => void): () => void {
  let existing = document.getElementById(BTN_ID)
  if (existing) existing.remove()

  const btn = document.createElement('button')
  btn.id = BTN_ID
  btn.type = 'button'
  btn.title = '3D 鲸鱼与星河外观调节'
  btn.setAttribute('aria-label', '3D 鲸鱼与星河外观调节')
  
  Object.assign(btn.style, {
    width: '36px',
    height: '36px',
    background: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
    color: 'var(--dsw-alias-label-secondary, #94a3b8)',
    transition: 'all 0.2s ease',
    flexShrink: '0',
    padding: '0'
  })

  // 专属微型 3D 鲸鱼 SVG 图标
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 12c1-4 4-7 9-7 6 0 10 3 11 6-2 1-3 3-5 3-3 0-4-2-7-2-3 0-5 2-8 0z"></path>
      <circle cx="16" cy="9" r="1" fill="currentColor"></circle>
      <path d="M7 16c2 1 4 1 6 0"></path>
    </svg>
  `

  btn.onmouseenter = () => {
    btn.style.background = 'var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, 0.08))'
    btn.style.color = '#4D6BFE'
  }
  btn.onmouseleave = () => {
    btn.style.background = 'transparent'
    btn.style.color = 'var(--dsw-alias-label-secondary, #94a3b8)'
  }
  btn.onclick = (e) => {
    e.stopPropagation()
    onTogglePanel(btn)
  }

  const mountToSidebar = () => {
    const footerActions = document.querySelector('div[class*="footerActions"], div[class*="SidebarRoot_footerActions"]')
    if (footerActions) {
      if (btn.parentElement !== footerActions) {
        footerActions.appendChild(btn)
      }
      return
    }

    const settingsArea = document.querySelector('div[class*="settingsArea"], div[class*="SidebarRoot_settingsArea"]')
    if (settingsArea && settingsArea.parentElement) {
      settingsArea.parentElement.insertBefore(btn, settingsArea)
      return
    }

    const footArea = document.querySelector('div[class*="SidebarRoot_footArea"], div[class*="footArea"]')
    if (footArea) {
      footArea.insertBefore(btn, footArea.firstChild)
      return
    }
    
    // 降级挂载：精确定位在侧栏列中心
    const sidebarRoot = document.querySelector('div[class*="SidebarRoot_root"], div[class*="AppFrame_sidebar"]')
    if (sidebarRoot) {
      const rect = sidebarRoot.getBoundingClientRect()
      btn.style.position = 'fixed'
      btn.style.left = `${rect.left + (rect.width - 36) / 2}px`
      btn.style.bottom = '56px'
      btn.style.zIndex = '9999'
      document.body.appendChild(btn)
    }
  }

  mountToSidebar()
  const observer = new MutationObserver(() => {
    if (!document.getElementById(BTN_ID) || btn.parentElement === document.body) {
      mountToSidebar()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })

  return () => {
    observer.disconnect()
    btn.remove()
  }
}

export function removeSidebarQuickButton(): void {
  document.getElementById(BTN_ID)?.remove()
}
