<template>
  <div class="btp-{{ compClassName }}">
    {{ compZhName }}: {{compDesc}}
  </div>
</template>

<script lang="ts">
import { defineComponent, isVue2, isVue3 } from 'vue-demi'

export default defineComponent({
  name: '{{compName}}',
  setup() {
    console.log('Button isVue2', isVue2)
    console.log('Button isVue3', isVue3)
    return {}
  }
})
</script>

<style scoped>
.btp-{{ compClassName }} {
}
</style>
