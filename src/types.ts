/**
 * 用户自定义配置接口
 */
export interface UserWhaleConfig {
  enabled: boolean
  brightness: number      // 0.2 ~ 1.8, 默认 1.0 (发光强度)
  inputOpacity: number    // 0.2 ~ 1.0, 默认 0.88 (对话输入框微透度)
  speed: number           // 0.5 ~ 2.0, 默认 1.0 (游动速度)
  scale: number           // 0.4 ~ 1.8, 默认 1.0 (鲸鱼体型缩放)
  galaxy: boolean         // 是否开启浩瀚星河背景
}

/**
 * 3D 体积点阵生成数据接口
 */
export interface WhaleVolumetricData {
  count: number
  positions: Float32Array
  normals: Float32Array
  scatteredPositions: Float32Array
  opacities: Float32Array
  edges: Float32Array
  jitters: Float32Array
}
