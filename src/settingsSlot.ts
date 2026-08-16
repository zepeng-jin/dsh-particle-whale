import { SETTINGS_NS } from './constants'
import { UserWhaleConfig } from './types'

export const zh = {
  title: '3D 粒子鲸鱼与星河',
  hint: 'DeepSeek 官网同款 3D 粒子鲸鱼与浩瀚星河背景（主界面静止呈现、对话窗口自动缩小至左下角、侧栏快捷调节）。',
  open: '开启',
  close: '关闭',
  statusOn: '已开启'
}

export const en = {
  title: '3D Particle Whale & Galaxy',
  hint: 'Authentic 3D particle whale with cosmic galaxy starfield (Stationary hero, mini bottom-left in chat).',
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

/**
 * 注册 DSH 官方通用设置面板插槽
 */
export function registerSettingsSlot(
  ctx: any,
  currentConfig: UserWhaleConfig,
  onApplyConfig: (cfg: UserWhaleConfig) => void
): { sync: (enabled: boolean) => void } {
  let bound: any
  let revision = 0

  const sync = (enabled: boolean) => {
    revision += 1
    bound?.sync(enabled, revision)
  }

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
        enabled: currentConfig.enabled,
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
                onClick: () => {
                  currentConfig.enabled = !enabled
                  onApplyConfig(currentConfig)
                },
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
            sync(currentConfig.enabled)
            return {
              setEnabled: (enabled: boolean) => {
                currentConfig.enabled = enabled
                onApplyConfig(currentConfig)
              }
            }
          }
        },
        EnabledRow
      )
    )
  } catch (err) {
    console.error('[dsh-particle-whale] failed to register settings slot:', err)
  }

  return { sync }
}
