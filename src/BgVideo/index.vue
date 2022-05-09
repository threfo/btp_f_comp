<script lang="ts">
// eslint-disable-next-line no-restricted-imports
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue-demi'

import h, { runSlot } from '../utils/h-demi'

// 建议使用 render 的模式编写组件 这样在vue2 和 vue3 兼容层面会更简单一点
// vue2 render https://cn.vuejs.org/v2/guide/render-function.html
// vue3 render https://staging-cn.vuejs.org/guide/extras/render-function.html
// vue3 setup 组合式函数 https://staging-cn.vuejs.org/guide/reusability/composables.html#extracting-composables-for-code-organization

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
  setup() {
    const currentInstance = getCurrentInstance()

    const isPlaying = ref(false)

    const playing = () => {
      // console.log('playing')
      isPlaying.value = true
    }

    const checkPaly = () => {
      console.log('checkPaly isPlaying.value', isPlaying.value)
      setTimeout(() => {
        console.log('checkPaly setTimeout isPlaying.value', isPlaying.value)
        if (!isPlaying.value) {
          const refVideo = currentInstance?.refs?.video as any
          refVideo?.play()

          checkPaly()
        }
      }, 3000)
    }

    onMounted(() => {
      const refVideo = currentInstance?.refs?.video as any
      if (refVideo) {
        refVideo.removeEventListener('playing', playing)
        refVideo.addEventListener('playing', playing)
      }

      checkPaly()
    })

    return {}
  },
  render() {
    const slot = this.$slots.default ? runSlot(this.$slots.default) : []
    const { poster, sources } = this
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
