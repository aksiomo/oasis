import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const require = createRequire(import.meta.url)
const dateFnsTzEsm = join(
  dirname(require.resolve('date-fns-tz/package.json')),
  'esm/index.js',
)

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const base = isGitHubPages ? process.env.PAGES_BASE_PATH || '/' : '/'

const config = defineConfig({
  base,
  resolve: {
    tsconfigPaths: true,
    alias: {
      'date-fns-tz': dateFnsTzEsm,
    },
  },
  plugins: [
    devtools(),
    nitro(),
    tailwindcss(),
    tanstackStart(isGitHubPages ? { spa: { enabled: true } } : undefined),
    viteReact(),
  ],
  ssr: {
    noExternal: [
      '@douyinfe/semi-ui',
      '@douyinfe/semi-foundation',
      '@douyinfe/semi-icons',
      '@douyinfe/semi-illustrations',
      'date-fns-tz',
      'scroll-into-view-if-needed',
    ],
  },
})

export default config
