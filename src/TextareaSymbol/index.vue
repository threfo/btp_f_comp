<template>
  <div class="btp-textarea-symbol">
    特殊符号提示输入框:
    当输入定义的特殊符号时会把符号后的内容请求对应的api提供内容选择
  </div>
</template>

<script lang="ts">
import { defineComponent, isVue2, isVue3 } from 'vue-demi'

export default defineComponent({
  name: 'TextareaSymbol',
  setup() {
    console.log('Button isVue2', isVue2)
    console.log('Button isVue3', isVue3)
    return {}
  }
})
</script>

<style scoped>
.btp-textarea-symbol {
}
</style>
