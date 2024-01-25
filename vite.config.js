import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/element/index.scss" as *;',
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    Pages({
      dirs: 'src/views',
      exclude: ['**/components/*.vue'],
      importMode: 'async',
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
        {
          pinia: ['storeToRefs'],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ['src/components/', 'src/shadcn/ui/*/'],
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
