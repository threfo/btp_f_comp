<template>
  <div class="btp-{{ compClassName }}">
    我是{{ compZhName }}组件
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
export default defineComponent({
  name: '{{ compName }}',
  setup(props, { emit }) {

    return {

    }
  }
})

</script>

<style scoped>
.btp-{{ compClassName }} {

}
</style>
