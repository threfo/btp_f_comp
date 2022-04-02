<template>
  <div>
    <btp-json-comp :value="test1" />
  </div>
</template>

<script setup>
const test1 = {
  is: 'div',
  html: 'this is test1'
}
</script>
