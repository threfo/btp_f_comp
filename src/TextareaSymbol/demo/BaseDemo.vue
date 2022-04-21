<template>
  <div>
    <TextareaSymbol
      v-model="value"
      :watch-symbols-policy="watchSymbolsPolicy"
    />

    <br />
    <button @click="showValue = !showValue">
      {{ showValue ? 'Hide' : 'Show' }} value
    </button>
    <div v-if="showValue">
      <div>value:</div>
      <div class="show">{{ JSON.stringify(value, null, 2) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { TextareaSymbol } from '@belloai/comp'

export default {
  name: 'TextareaSymbolBaseDemo',
  components: {
    TextareaSymbol
  },
  data() {
    return {
      showValue: false,
      value: [
        { type: 'text', data: 'a' },
        {
          type: 'symbol',
          data: { id: '0', label: 'person 0 ', type: 'person', symbol: '@' }
        },
        { type: 'text', data: '​asdf' },
        {
          type: 'symbol',
          data: { id: '0', label: 'topic 0 ', type: 'topic', symbol: '#' }
        }
      ],
      watchSymbolsPolicy: [
        {
          symbol: '@',
          regExp: /@([^@]*)$/,
          watchInputEvent: (e: Event | any) => {
            const { code, shiftKey } = e || {}
            return code === 'Digit2' && shiftKey
          },
          watchStr: (str: string) => {
            const keywords = /@([^@]*)$/.exec(str)
            return !!(keywords && keywords.length >= 2)
          },
          getKeywords: (str: string) => {
            const [allMathStr, keywords] = /@([^@]*)$/.exec(str) || []
            if (allMathStr === '@') {
              return ''
            }
            return keywords
          },
          getListByKeywords: async (kw = '') => {
            return await Promise.resolve(
              Array.from({ length: 10 }).map((_, i) => ({
                id: `${i}`,
                label: `person ${i} ${kw}`,
                type: 'person',
                symbol: '@'
              }))
            )
          }
        },
        TextareaSymbol.initSymbolsPolicy({
          symbol: '#',
          regExp: /#([^#]*)$/,
          watchInputEvent: (e: Event | any) => {
            const { code, shiftKey } = e || {}
            return code === 'Digit3' && shiftKey
          },
          getListByKeywords: async (kw = '') => {
            return await Promise.resolve(
              Array.from({ length: 10 }).map((_, i) => ({
                id: `${i}`,
                label: `topic ${i} ${kw}`,
                type: 'topic',
                symbol: '#'
              }))
            )
          }
        })
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.show {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>
