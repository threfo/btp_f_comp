<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <TextareaSymbol :watch-symbols-policy="watchSymbolsPolicy" />

    <BgVideo
      style="height: 300px"
      :sources="[
        'https://assets.belloai.com/62285820fe60122b4d5bb769/都市.mp4'
      ]"
      poster="https://assets.belloai.com/6228586afe60122b4d5bb76e/都市-0001.jpeg"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import { TextareaSymbol, BgVideo } from '@belloai/comp'

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

@Component({
  components: {
    HelloWorld,
    TextareaSymbol,
    BgVideo
  },
  data() {
    return {
      watchSymbolsPolicy
    }
  }
})
export default class App extends Vue {}
</script>

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
