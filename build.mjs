import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'

console.log('[build] Bundling client.ts with esbuild CLI...')

execSync(
  'npx esbuild src/client.ts --bundle --format=cjs --target=es2022 --minify --external:react --external:"react/*" --external:"@deepseek-ai/*" --outfile=lib/client.raw.js',
  { stdio: 'inherit' }
)

const bundledCode = readFileSync('lib/client.raw.js', 'utf8')
unlinkSync('lib/client.raw.js')

const finalBanner = `window.__ModuleLoader__.load({
  id: "dsh-particle-whale",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
${bundledCode}
    return module.exports;
  }
});
`

writeFileSync('lib/client.js', finalBanner, 'utf8')
console.log(`[build] Successfully generated lib/client.js (${Math.round(finalBanner.length / 1024)} KB)`)
