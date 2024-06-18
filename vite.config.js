import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueDevTools(),
    vue({
      template: {
        compilerOptions: {
          // 这行是为了避免与 Ionic 框架的标签名冲突,如果你没有使用 Ionic,可以忽略
          isCustomElement: tag => tag.includes('ion-'),
        },
      },
    }),
    vueJsx(),
    svgLoader(),
    Pages({
      dirs: 'src/views',
      exclude: ['**/components/*.vue'],
      importMode: 'async',
      routeStyle: 'nuxt',
    }),
    Layouts({
      layoutsDirs: 'src/layout', // 布局文件存放目录
      defaultLayout: 'default', // 默认布局，对应 src/layout/default.vue
    }),
    AutoImport({
      dts: true,
      dirs: ['./src/lib', './src/api', './src/store/modules'],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'vue-request': ['useRequest'],
        },
        {
          pinia: ['storeToRefs'],
        },
      ],
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
    }),
    Components({
      dirs: ['src/components/'],
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        PrimeVueResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/assets/element/index.scss" as *;`,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    // proxy: {
    //   '/api_v1': {
    //     target: 'http://127.0.0.1:7001',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api_v1\/wechat/, 'wechat'),
    //   },
    // },
  },
})
