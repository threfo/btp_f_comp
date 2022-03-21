<template>
  <button class="btp-button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(["click"]);
</script>

<style scoped>
.btp-button {
}
</style>
