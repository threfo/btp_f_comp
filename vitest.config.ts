/* eslint-disable spaced-comment */
/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve } from 'path'

import { defineConfig } from 'vite'

import viteConfig from './vite.config'

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, '.test/setup.ts')],
    reporters: 'dot',
    deps: {
      inline: ['vue2', '@vue/composition-api', 'vue-demi']
    }
  }
})
