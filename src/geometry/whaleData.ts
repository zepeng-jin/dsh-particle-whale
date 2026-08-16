import * as THREE from 'three'
import { WhaleVolumetricData } from '../types'
import { WHALE_PATH, PARTICLE_SPACING } from '../constants'

/**
 * 将官方鲸鱼 SVG 路径光栅化为 2D 栅格，并计算欧氏距离场 (EDT) 生成 3D 体积点阵
 */
export function generateVolumetricWhaleData(gridSize: number): WhaleVolumetricData {
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
