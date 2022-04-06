<template>
  <div class="btp-button">我是按钮组件</div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "Button",
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style scoped>
.btp-button {
}
</style>
