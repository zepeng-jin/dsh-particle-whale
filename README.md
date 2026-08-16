# dsh-particle-whale 🐳

> [English](./README.md) | [简体中文](./README.zh-CN.md)

A native Three.js 3D particle whale background plugin for [DeepSeek Harness (DSH)](https://github.com/deepseek-ai) and DSH Desktop.

Recreated with authentic WebGL shaders, full-screen forward fluid locomotion, volumetric 3D particle distribution, and real-time reactive state hooks.

---

## Features

- **Volumetric 3D Particle Mesh**: Uses distance-transform mapping to turn DeepSeek's 2D vector silhouette into a full 3D spindle body with curved dorsal/belly thickness, surface normals, specular highlights, and Fresnel rim glow.
- **Head-First Forward Swimming**: True aquatic locomotion where the head guides the heading and traveling waves propagate down the spine to the flukes. Banks smoothly into turns across the full window.
- **Reactive Agent State**:
  - **Idle**: Calm, slow cruise (`0.9x speed`) with subtle tail undulation.
  - **Active (Thinking / Streaming / Tool execution)**: Accelerates to `2.6x speed` with strong power strokes, spinal wave surges, and bioluminescent aurora pulse waves.
- **New Session Scatter Effect**: Triggers a clean nebula explosion and reassembly animation only when creating a new session (`Cmd+N` / `Ctrl+N` or clicking the "New Chat" button). Casual clicks are ignored to keep reading undisturbed.
- **Frosted Glass Composer**: Adds an 88% translucent frosted glass finish (`backdrop-filter: blur(20px)`) to the chat input card so the whale swims visibly underneath without affecting text contrast.
- **Dark / Light Theme Adaptive**: Silver-cyan glowing particles with additive blending in dark mode; high-contrast deep sapphire particles in light mode.
- **Settings Panel Integration**: Plugs directly into DSH Desktop's General Settings page with a native toggle switch and local state persistence.
- **High Performance (60–120 FPS)**: `pointer-events: none` overlay, precomputed jitter buffers, instanced mesh rendering, and decoupled async state polling.

---

## Directory Structure

```text
dsh-particle-whale/
├── package.json          # Cordis client injection manifest
├── cordis.patch.yml      # Cordis kernel plugin patch
├── build.mjs             # esbuild bundler (inlines Three.js runtime)
├── src/
│   └── client.ts         # WebGL rendering pipeline, physics & UI store
├── lib/
│   ├── index.js          # Host entry (empty for client-only plugins)
│   └── client.js         # Production bundle (zero runtime dependencies)
├── README.md
└── LICENSE
```

---

## Quick Start

### Option 1: Symlink (Recommended for local dev & testing)

1. Open the DSH Desktop web profile `node_modules` directory:
   ```bash
   cd ~/Library/Application\ Support/dsh-desktop/harness/profiles/web/node_modules
   ```

2. Symlink this project:
   ```bash
   ln -s /path/to/dsh-particle-whale dsh-particle-whale
   ```

3. Register the plugin in `~/Library/Application Support/dsh-desktop/harness/profiles/web/package.json`:
   ```json
   {
     "dependencies": {
       "dsh-particle-whale": "*"
     },
     "dsh": {
       "profile": {
         "bundles": [
           "dsh-particle-whale"
         ]
       }
     }
   }
   ```

4. Launch or reload **DSH Desktop** (`Cmd+R`).

---

### Option 2: Install via npm

```bash
cd ~/Library/Application\ Support/dsh-desktop/harness/profiles/web
npm install dsh-particle-whale
```

---

## Development & Building

To modify the shaders, kinematics, or UI components:

```bash
# Install build dependencies
npm install

# Compile src/client.ts -> lib/client.js
npm run build
```

---

## License

[MIT](./LICENSE) © 2026
