/**
 * 检测当前是否为暗色模式
 */
export function checkIsDarkTheme(): boolean {
  if (typeof document === 'undefined') return true
  return document.body.hasAttribute('data-ds-dark-theme')
}

/** 
 * 严格准确判断当前是否为「主界面 (Hero / 空白新会话)」还是「对话消息窗口 (Active Chat)」
 */
export function checkIsHeroScreen(): boolean {
  if (typeof document === 'undefined') return true

  // 1. 明确标记：DSH 活跃对话阶段必定携带 data-phase="active"
  if (document.querySelector('[data-phase="active"]')) {
    return false
  }

  // 2. 检查输入框 placeholder
  const textareas = document.querySelectorAll('textarea')
  for (let i = 0; i < textareas.length; i++) {
    const ph = textareas[i]?.getAttribute('placeholder') || ''
    if (ph.includes('给智能体发消息') || ph.includes('Send a message') || ph.includes('智能体')) {
      return false
    }
  }

  // 3. 检查是否有对话消息节点、代码块、复制按钮或会话流
  const hasChatElements = document.querySelector(
    'pre, code, div[class*="Turn_root"], [data-turn-id], div[class*="viewArea"], div[class*="ChatList"], div[class*="chat_"], div[class*="Message"]'
  )
  if (hasChatElements !== null) {
    if (!document.querySelector('[data-phase="hero"]')) {
      return false
    }
  }

  // 4. 明确的 Hero 标记
  if (document.querySelector('[data-phase="hero"], [class*="composerHero"], [class*="heroWorkspaceRow"]')) {
    return true
  }

  // 5. 检查页面中是否有主页标语
  const h1 = document.querySelector('h1')
  if (h1 && (h1.textContent?.includes('探索未至之境') || h1.textContent?.includes('Into the Unknown'))) {
    return true
  }

  return false
}

/**
 * 检测 Agent 是否处于运行/思考/推理状态
 */
export function checkIsAgentWorking(): boolean {
  if (typeof document === 'undefined') return false

  const stopButton = document.querySelector(
    'button[aria-label*="停止"], button[aria-label*="Stop"], button[aria-label*="stop"], [aria-label*="停止生成"], [aria-label*="Stop generating"], [data-action="stop"]'
  )
  if (stopButton !== null) {
    return true
  }

  const runningElement = document.querySelector(
    '[data-state="running"], [data-status="running"], [data-follow-end="true"], [data-variant="think"][data-state="running"], .is-streaming, .is-busy, [aria-busy="true"], [class*="TurnStatus"], [class*="running"]'
  )
  if (runningElement !== null) {
    return true
  }

  const loadingElement = document.querySelector('[class*="CompactionCommandCard"], [class*="ModelRetry"]')
  return loadingElement !== null
}
