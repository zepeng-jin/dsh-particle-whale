import * as THREE from 'three'

/**
 * 浩瀚星河背景粒子数据生成 (Cosmic Starfield & Galaxy Stream)
 */
export function generateGalaxyData(count: number = 800): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const twinkles = new Float32Array(count * 2)

  const galaxyColorA = new THREE.Color(0x38bdf8) // 璀璨浅天蓝
  const galaxyColorB = new THREE.Color(0x818cf8) // 梦幻星系紫
  const galaxyColorC = new THREE.Color(0xe0f2fe) // 纯净星芒白
  const tmpCol = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const isRibbon = Math.random() < 0.65
    let x = 0
    let y = 0
    let z = 0

    if (isRibbon) {
      const t = (Math.random() - 0.5) * 28.0
      const spreadY = (Math.random() - 0.5) * 6.0
      x = t
      y = -t * 0.35 + spreadY
      z = (Math.random() - 0.5) * 12.0 - 2.0
    } else {
      x = (Math.random() - 0.5) * 32.0
      y = (Math.random() - 0.5) * 20.0
      z = (Math.random() - 0.5) * 14.0 - 4.0
    }

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    const randC = Math.random()
    if (randC < 0.45) {
      tmpCol.copy(galaxyColorA)
    } else if (randC < 0.8) {
      tmpCol.copy(galaxyColorB)
    } else {
      tmpCol.copy(galaxyColorC)
    }

    colors[i * 3] = tmpCol.r
    colors[i * 3 + 1] = tmpCol.g
    colors[i * 3 + 2] = tmpCol.b

    sizes[i] = 1.2 + Math.random() * 2.8
    twinkles[i * 2] = 0.5 + Math.random() * 2.0
    twinkles[i * 2 + 1] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkles, 2))

  return geometry
}
