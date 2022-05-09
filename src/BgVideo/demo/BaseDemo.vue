<template>
  <div>
    <BgVideo
      style="height: 300px"
      :sources="[
        'https://assets.belloai.com/62285820fe60122b4d5bb769/都市.mp4'
      ]"
      poster="https://assets.belloai.com/6228586afe60122b4d5bb76e/都市-0001.jpeg"
    />

    <BgVideo
      style="height: 300px"
      :sources="[
        'https://assets.belloai.com/62285820fe60122b4d5bb769/都市.mp4'
      ]"
      poster="https://assets.belloai.com/6228586afe60122b4d5bb76e/都市-0001.jpeg"
    >
      <div class="bg-video-demo-title">
        <div>1231</div>
      </div>
    </BgVideo>
  </div>
</template>

<script lang="ts">
import { BgVideo } from '@belloai/comp'

export default {
  name: 'BgVideoBaseDemo',
  components: {
    BgVideo
  }
}
</script>

<style lang="scss" scoped>
.bg-video-demo-title {
  @apply text-white text-3xl;
}
</style>
