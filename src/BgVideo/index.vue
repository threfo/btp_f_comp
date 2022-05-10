<script lang="ts">
/* eslint-disable no-restricted-imports */
import { defineComponent, isVue2 } from 'vue-demi'

import demiH, { runSlot } from '../utils/h-demi'

// 建议使用 render 的模式编写组件 这样在vue2 和 vue3 兼容层面会更简单一点
// vue2 render https://cn.vuejs.org/v2/guide/render-function.html
// vue3 render https://staging-cn.vuejs.org/guide/extras/render-function.html
// vue3 setup 组合式函数 https://staging-cn.vuejs.org/guide/reusability/composables.html#extracting-composables-for-code-organization

let checkPlaying = false

const sleep = (s: number) => {
  return new Promise((r: any) => {
    setTimeout(() => {
      r()
    }, s)
  })
}

export default defineComponent({
  name: 'BgVideo',
  props: {
    sources: {
      type: Array,
      required: true
    },
    poster: {
      type: String,
      required: true
    }
  },
  async mounted() {
    await this.checkPlay()
  },
  methods: {
    async checkPlay() {
      if (checkPlaying) {
        return
      }

      checkPlaying = true
      const refVideo = this?.$refs?.video as any
      const s1 = refVideo?.currentTime
      await sleep(1500)
      const s2 = refVideo?.currentTime
      checkPlaying = false

      if (s1 !== s2) {
        return
      }
      console.warn('not auto play, try to play')
      refVideo?.play()
      await this.checkPlay()
    }
  },
  render(createElement: any) {
    const slot = this.$slots.default ? runSlot(this.$slots.default) : []
    const { poster, sources } = this

    const h = isVue2 ? createElement : demiH
    return h(
      'div',
      {
        class: 'btp-bg-video'
      },
      [
        h(
          'div',
          {
            style: {
              'z-index': 1
            },
            on: {
              mouseover: this.checkPlay
            }
          },
          slot || []
        ),
        h(
          'video',
          {
            ref: 'video',
            style: {
              inset: '-100%'
            },
            attrs: {
              poster,
              autoplay: true,
              loop: 'loop',
              muted: true,
              preload: 'auto',
              'webkit-playsinline': true,
              playsinline: 'true',
              'x-webkit-airplay': 'allow',
              'x5-video-player-type': 'h5',
              'x5-video-player-fullscreen': true,
              'x5-video-orientation': 'portraint'
            }
          },
          [
            sources.map((src: string) =>
              h('source', {
                attrs: {
                  src
                }
              })
            )
          ]
        )
      ]
    )
  }
})
</script>

<style lang="scss">
.btp-bg-video {
  @apply relative overflow-hidden;
  video {
    @apply bg-cover bg-center absolute m-auto h-full w-full object-cover;
  }
  > div {
    @apply absolute inset-0 flex items-center justify-center;
  }
}
</style>
