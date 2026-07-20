import { defineConfig } from '@rsbuild/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    title: '我们的时光故事',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': '我们的时光故事',
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
