<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { TextareaSymbol } from '@belloai/comp'

const initWatchSymbolsPolicy = (initSymbolsPolicy: any) => {
  return [
    initSymbolsPolicy({
      symbol: '@',
      regExp: /@([^@]*)$/,
      watchInputEvent: (e: Event | any) => {
        const { code, shiftKey } = e || {}
        return code === 'Digit2' && shiftKey
      },
      getListByKeywords: async (kw = '') => {
        return await Promise.resolve(
          Array.from({ length: 10 }).map((_, i) => ({
            id: `${i}`,
            label: `topic ${i} ${kw}`,
            type: 'topic',
            symbol: '@'
          }))
        )
      }
    })
  ]
}

const watchSymbolsPolicy = initWatchSymbolsPolicy(
  TextareaSymbol.initSymbolsPolicy
)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

  <TextareaSymbol :watchSymbolsPolicy="watchSymbolsPolicy" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
