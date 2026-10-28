import { defineConfig } from '@rsbuild/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    favicon: './public/favicon.ico',
    template: './index.html',
    title: '💍 Xinlü & Liuxj · From Hello to Forever',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Xinlü & Xiongjian',
    },
  },
  server: {
    base: '/time',
  },
  output: {
    assetPrefix: '/time/',
  },
  plugins: [pluginReact(), pluginLess()],
})
