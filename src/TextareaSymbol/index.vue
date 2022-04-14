<template>
  <div class="btp-textarea-symbol">
    <slot></slot>
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
