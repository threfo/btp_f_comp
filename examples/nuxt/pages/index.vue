<template>
  <div>
    <NuxtLogo />

    this is text nuxt page

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
import Vue from 'vue'
import { BgVideo } from '@belloai/comp'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    BgVideo
  }
})
</script>
