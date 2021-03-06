// pnpm build 用到的vite配置
// 所有的配置 https://cn.vitejs.dev/config/

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

import { defineConfig } from 'vite'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
    include: [],
    exclude: ['vue-demi']
  },
  build: {
    minify: true,
    lib: {
      entry: resolve('./src/index.ts'),
      name: 'btp_f_comp'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue-demi', 'vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        }
      }
    }
  }
})
