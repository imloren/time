import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginLess } from '@rsbuild/plugin-less'

export default defineConfig({
  html: {
    title: '我们的时光故事',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      charset: 'utf-8',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': '我们的时光故事',
    },
    tags: [
      // 预加载字体文件，提高加载速度并启用缓存
      {
        tag: 'link',
        attrs: {
          rel: 'preload',
          href: 'https://cdn.jsdelivr.net/gh/imloren/cdn@main/fonts/lxgwwk.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      },
      // DNS 预解析，加速字体 CDN 连接
      {
        tag: 'link',
        attrs: {
          rel: 'dns-prefetch',
          href: 'https://cdn.jsdelivr.net',
        },
      },
      // 预连接字体 CDN，建立早期连接
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net',
          crossorigin: 'anonymous',
        },
      },
    ],
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
