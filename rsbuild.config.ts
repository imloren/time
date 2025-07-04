import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginLess } from '@rsbuild/plugin-less'

export default defineConfig({
  html: {
    title: '我们的时光故事',
  },
  output: {
    assetPrefix: '/time/',
    filenameHash: true,
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
  plugins: [pluginReact(), pluginLess()],
})
