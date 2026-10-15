/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { renderInclude } from './src/render'
import type { PageId } from './src/site'

function htmlIncludes(): Plugin {
  let root = process.cwd()
  let base = '/'
  return {
    name: 'vcc-html-includes',
    configResolved(config) {
      root = config.root
      base = config.base
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const route = context.path.split('/').filter(Boolean)[0]
        const page: PageId = route === 'about' || route === 'companies' || route === 'events' ? route : 'home'
        return html.replace(/<!--\s*@include:\s*(\S+?)\s*-->/g, (_marker, name: string) =>
          renderInclude(name, page).replace(/href="\//g, `href="${base}`))
      },
    },
    configureServer(server) {
      server.watcher.add(resolve(root, 'content'))
      server.watcher.on('change', (file) => {
        if (file.endsWith('.md') || file.endsWith('render.ts') || file.endsWith('site.ts')) server.ws.send({ type: 'full-reload' })
      })
    },
  }
}
export default defineConfig({
  plugins: [htmlIncludes()],
  publicDir: process.env.VCC_PUBLIC_DIR || 'public',
  build: {
    outDir: process.env.VCC_BUILD_DIR || 'dist',
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        about: resolve(process.cwd(), 'about/index.html'),
        companies: resolve(process.cwd(), 'companies/index.html'),
        events: resolve(process.cwd(), 'events/index.html'),
      },
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '.claude/**'],
  },
})
