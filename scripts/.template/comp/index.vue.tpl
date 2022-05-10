<script lang="ts">
import { defineComponent, isVue2, isVue3 } from 'vue-demi'

import demiH from '../utils/h-demi'

// 建议使用 render 的模式编写组件 这样在vue2 和 vue3 兼容层面会更简单一点
// vue2 render https://cn.vuejs.org/v2/guide/render-function.html
// vue3 render https://staging-cn.vuejs.org/guide/extras/render-function.html
// vue3 setup 组合式函数 https://staging-cn.vuejs.org/guide/reusability/composables.html#extracting-composables-for-code-organization


export default defineComponent({
  name: '{{compName}}',
  setup() {
    console.log('Button isVue2', isVue2)
    console.log('Button isVue3', isVue3)
    return {
      compZhName: '{{ compZhName }}',
      compDesc: '{{ compDesc }}'
    }
  },
  // 不建议采用在 setup 时输出模版内容，会导致打包后nuxt方案检查不到render函数，会提示You are using the runtime-only build of Vue where the template compiler is not available
  render(createElement: any) {
    const h = isVue2 ? createElement : demiH

    const { compZhName, compDesc } = this

    return h('div', {
      class:"btp-{{ compClassName }}"
    }, `${compZhName}: ${compDesc}`)
  }
})
</script>

<style lang="scss" scoped>
.btp-{{ compClassName }} {
}
</style>
