<script lang="ts">
import { defineComponent, h } from 'vue-demi'

import isFunction from 'lodash/isFunction'

import {
  formatValue,
  getData,
  getTemplateData,
  formatCommand,
  getNeedRunCommand,
  jsonCompValue2Render,
  isReservedComp
} from './utils/jsonComp'

export default defineComponent({
  name: 'JsonComp',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    parentData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modelData: '',
      dataProps: {}, // 可用户交互时修改props 的内容
      compData: {}, // 当前组件用于做渲染的数据
      templateData: null
    }
  },
  computed: {
    stateCommand() {
      if (!this.$store?.comp) {
        console.warn(`vuex need 'comp' model and state 'stateCommand'`)
      }

      return this.$store?.comp?.stateCommand
    },

    __showData({
      value,
      compData: data,
      parentData
    }: {
      value: JsonCompValue
      compData: any
      parentData: any
    }) {
      return getData({ value, data, parentData, that: this })
    },

    afterTemplateData({
      templateData,
      value
    }: {
      templateData: Template | null
      value: JsonCompValue
    }) {
      const { value: templateDataValue } = templateData || {}
      return templateDataValue || value
    },
    __showValue({
      afterTemplateData: value,
      __showData: data
    }: {
      afterTemplateData: JsonCompValue
      __showData: any
    }) {
      return formatValue({ value, data })
    },
    needRunCommand({
      stateCommand: command,
      __showValue: value,
      __showData: data
    }: {
      stateCommand: Command
      __showValue: JsonCompValue
      __showData: any
    }) {
      const afterFormatCommand = formatCommand({ command, data })
      // console.log('needRunCommand data 1', data)

      const needRunCommand = getNeedRunCommand({
        value,
        command: afterFormatCommand
      })
      // if (needRunCommand) {
      //   console.log('needRunCommand data 2', data)
      // }

      return needRunCommand
    },
    __componentName({ __showValue }: { __showValue: JsonCompValue }) {
      const { is } = __showValue
      return is
    },
    reservedComp({ __componentName }: { __componentName: string }) {
      return isReservedComp(__componentName, this)
    },

    createdDirectives({ __showValue }: { __showValue: JsonCompValue }) {
      const { hook } = __showValue || {}
      const { created } = hook || {}
      if (created) {
        return getDirectives(created)
      }
      return null
    },
    mountedDirectives({ __showValue }: { __showValue: JsonCompValue }) {
      const { hook } = __showValue || {}
      const { mounted } = hook || {}
      if (mounted) {
        return getDirectives(mounted)
      }
      return null
    },
    modelDataChangeDirectives({ __showValue }: { __showValue: JsonCompValue }) {
      const { hook } = __showValue || {}
      const { modelDataChange } = hook || {}
      if (modelDataChange) {
        return getDirectives(modelDataChange)
      }
      return null
    },
    routeChangeDirectives({ __showValue }: { __showValue: JsonCompValue }) {
      const { hook } = __showValue || {}
      const { routeChange } = hook || {}
      if (routeChange) {
        return getDirectives(routeChange)
      }
      return null
    },
    routeChangeWatch({
      routeChangeDirectives
    }: {
      routeChangeDirectives: Directive[] | null
    }) {
      if (routeChangeDirectives) {
        return {
          directiveList: routeChangeDirectives,
          query: { ...this.$route.query }
        }
      }
      return null
    },
    modelDataChangeWatch({
      modelDataChangeDirectives,
      modelData
    }: {
      modelDataChangeDirectives: Directive[] | null
      modelData: any
    }) {
      if (modelDataChangeDirectives) {
        return {
          directiveList: modelDataChangeDirectives,
          value: modelData
        }
      }
      return null
    }
  } as any,
  render(createElement) {
    console.log('JsonComp render this', this)

    const { __showValue, reservedComp } = this

    let hFunc = h
    if (isFunction(createElement)) {
      hFunc = createElement
    }

    if (!reservedComp) {
      return hFunc('div')
    }

    return jsonCompValue2Render({
      jsonCompValue: __showValue,
      that: this,
      createElement: hFunc
    })
  }
})

// import { reactive, ref, onMounted, watch, defineComponent } from 'vue-demi'
// import Vue from 'vue'
// import isFunction from 'lodash/isFunction'
// import { JsonCompValue, Template, Command } from './utils/jsonComp/type'
// import {
//   formatValue,
//   getData,
//   getTemplateData,
//   formatCommand,
//   getNeedRunCommand,
//   jsonCompValue2Render
// } from './utils/jsonComp'

// import { Directive } from './utils/jsonComp/directive/type'
// import { runDirectives, getDirectives } from './utils/jsonComp/directive'

// export default defineComponent({
//   name: 'JsonComp',
//   props: {
//     value: {
//       type: Object,
//       default: () => ({})
//     },
//     parentData: {
//       type: Object,
//       default: () => ({})
//     }
//   },
//   data() {
//     return {
//       modelData: '',
//       dataProps: {}, // 可用户交互时修改props 的内容
//       compData: {}, // 当前组件用于做渲染的数据
//       templateData: null
//     }
//   },
//   computed: {
//     stateCommand() {
//       if (!this.$store?.comp) {
//         console.warn(`vuex need 'comp' model and state 'stateCommand'`)
//       }

//       return this.$store?.comp?.stateCommand
//     },

//     __showData({
//       value,
//       compData: data,
//       parentData
//     }: {
//       value: JsonCompValue
//       compData: any
//       parentData: any
//     }) {
//       return getData({ value, data, parentData, that: this })
//     },

//     afterTemplateData({
//       templateData,
//       value
//     }: {
//       templateData: Template | null
//       value: JsonCompValue
//     }) {
//       const { value: templateDataValue } = templateData || {}
//       return templateDataValue || value
//     },
//     __showValue({
//       afterTemplateData: value,
//       __showData: data
//     }: {
//       afterTemplateData: JsonCompValue
//       __showData: any
//     }) {
//       return formatValue({ value, data })
//     },
//     needRunCommand({
//       stateCommand: command,
//       __showValue: value,
//       __showData: data
//     }: {
//       stateCommand: Command
//       __showValue: JsonCompValue
//       __showData: any
//     }) {
//       const afterFormatCommand = formatCommand({ command, data })
//       // console.log('needRunCommand data 1', data)

//       const needRunCommand = getNeedRunCommand({
//         value,
//         command: afterFormatCommand
//       })
//       // if (needRunCommand) {
//       //   console.log('needRunCommand data 2', data)
//       // }

//       return needRunCommand
//     },
//     __componentName({ __showValue }: { __showValue: JsonCompValue }) {
//       const { is } = __showValue
//       return is
//     },
//     reservedComp({ __componentName }: { __componentName: string }) {
//       let isReserved = false
//       const { isReservedTag } = Vue.config as any
//       if (isFunction(isReservedTag)) {
//         isReserved = !!isReservedTag(compName)
//       }

//       if (!isReserved) {
//         const { $options } = this || {}

//         const { components } = $options || {}
//         isReserved =
//           !!components[compName] ||
//           !!components[upperFirst(camelCase(compName))]
//       }
//       // console.log('isReservedComp', compName, isReserved)
//       return isReserved
//     },

//     createdDirectives({ __showValue }: { __showValue: JsonCompValue }) {
//       const { hook } = __showValue || {}
//       const { created } = hook || {}
//       if (created) {
//         return getDirectives(created)
//       }
//       return null
//     },
//     mountedDirectives({ __showValue }: { __showValue: JsonCompValue }) {
//       const { hook } = __showValue || {}
//       const { mounted } = hook || {}
//       if (mounted) {
//         return getDirectives(mounted)
//       }
//       return null
//     },
//     modelDataChangeDirectives({ __showValue }: { __showValue: JsonCompValue }) {
//       const { hook } = __showValue || {}
//       const { modelDataChange } = hook || {}
//       if (modelDataChange) {
//         return getDirectives(modelDataChange)
//       }
//       return null
//     },
//     routeChangeDirectives({ __showValue }: { __showValue: JsonCompValue }) {
//       const { hook } = __showValue || {}
//       const { routeChange } = hook || {}
//       if (routeChange) {
//         return getDirectives(routeChange)
//       }
//       return null
//     },
//     routeChangeWatch({
//       routeChangeDirectives
//     }: {
//       routeChangeDirectives: Directive[] | null
//     }) {
//       if (routeChangeDirectives) {
//         return {
//           directiveList: routeChangeDirectives,
//           query: { ...this.$route.query }
//         }
//       }
//       return null
//     },
//     modelDataChangeWatch({
//       modelDataChangeDirectives,
//       modelData
//     }: {
//       modelDataChangeDirectives: Directive[] | null
//       modelData: any
//     }) {
//       if (modelDataChangeDirectives) {
//         return {
//           directiveList: modelDataChangeDirectives,
//           value: modelData
//         }
//       }
//       return null
//     }
//   } as any,
//   watch: {
//     needRunCommand: {
//       handler(command) {
//         // console.log('needRunCommand watch', command)
//         if (command) {
//           this.command(command)

//           this.$nextTick(() => {
//             this.setStateCommand(null)
//           })
//         }
//       }
//     },

//     __componentName: {
//       async handler(newValue, oldValue) {
//         // console.log('componentName watch', newValue, oldValue)
//         if (
//           newValue !== oldValue &&
//           this.templateData === null &&
//           !this.reservedComp
//         ) {
//           this.templateData = await getTemplateData(newValue, this)
//         }
//       },
//       immediate: true
//     },
//     modelDataChangeWatch: {
//       async handler(newValue) {
//         console.log('modelDataChangeWatch watch', newValue)

//         const { directiveList, value } = newValue || {}
//         if (directiveList) {
//           await this.runDirectives(directiveList, [value])
//         }
//       }
//     },

//     // 如果是模版内定义的 created 周期其实是 __showValue 改变后才是真的 created，通过immediate: true 来实现 created 的效果
//     createdDirectives: {
//       async handler(newValue, oldValue) {
//         if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
//           // console.log('$route.query watch1', newValue)

//           if (newValue) {
//             // console.log('$route.query watch2', newValue, directiveList)
//             await this.runDirectives(newValue)
//           }
//         }
//       },
//       immediate: true
//     },
//     routeChangeWatch: {
//       async handler(newValue, oldValue) {
//         if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
//           // console.log('$route.query watch1', newValue)
//           const { directiveList, query } = newValue || {}

//           if (directiveList) {
//             // console.log('$route.query watch2', newValue, directiveList)
//             await this.runDirectives(directiveList, [query || {}])
//           }
//         }
//       },
//       immediate: true
//     }
//   },
//   async mounted() {
//     // console.log('JsonComp mounted', this.__showValue?.is, this.value.html, this)
//     const { mountedDirectives: directiveList } = this
//     if (directiveList) {
//       await this.runDirectives(directiveList)
//     }
//   },
//   methods: {
//     ...mapMutations('comp', ['setStateCommand']),
//     command(command: Command): void {
//       // console.log('JsonComp methods command', command)
//       const { type } = command || {}
//       const func = this[type] || {}
//       if (isFunction(func)) {
//         this[type](command)
//         return
//       }
//       this.$emit('command', command)
//     },
//     runCommandDirectives(command: Command): void {
//       // console.log('JsonComp methods runCommandDirectives', command)
//       const { value } = command || {}
//       if (!value) {
//         console.error('command runDirectives must have value')
//         return
//       }

//       const directiveList = getDirectives(value)

//       // console.log(
//       //   'JsonComp methods runCommandDirectives directiveList:',
//       //   directiveList
//       // )
//       this.runDirectives(directiveList).then()
//     },

//     async runDirectives(directiveList: Directive[], props?: any) {
//       await runDirectives({
//         that: this,
//         directiveList,
//         props
//       })
//     }
//   } as any,
//   render(createElement) {
//     const { __showValue, reservedComp } = this

//     if (!reservedComp) {
//       return createElement('div')
//     }

//     return jsonCompValue2Render({
//       jsonCompValue: __showValue,
//       that: this,
//       createElement
//     })
//   }
// })
</script>
