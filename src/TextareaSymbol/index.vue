<script lang="ts">
import {
  defineComponent,
  isVue2,
  getCurrentInstance,
  ref,
  watch,
  withModifiers,
  nextTick,
  Ref
} from 'vue-demi'

import h from '../utils/h-demi'

import {
  onInputKeyDown,
  onInputText,
  doToggleDropdown,
  onCloseDropdown,
  doOnPaste,
  onLiMousedown,
  onCompositionEnd,
  initEditorEle,
  initSymbolsPolicy
} from './utils'

import {
  DropdownListItem,
  EditorValueItem,
  SymbolsPolicy,
  EditorRange,
  DropdownPos,
  SetupRef
} from './utils/type'

const compProps: any = {
  watchSymbolsPolicy: {
    type: Array,
    required: true
  }
}

if (isVue2) {
  compProps.value = {
    type: Array,
    default: () => []
  }
} else {
  compProps.modelValue = {
    type: Array,
    default: () => []
  }
}

const comp = defineComponent({
  name: 'TextareaSymbol',
  props: compProps,
  setup(props, { emit }) {
    const currentInstance = getCurrentInstance()

    const list: Ref<DropdownListItem[]> = ref([])
    const activeIndex: Ref<number> = ref(0)
    const dropdownPos: Ref<DropdownPos> = ref({ top: '0', left: '0' })
    const isShowDropdown: Ref<boolean> = ref(false)
    const editorValue: Ref<EditorValueItem[]> = ref([])
    const preventKeyUp: Ref<boolean> = ref(false)
    const symbolsPolicy: Ref<SymbolsPolicy | null> = ref(null)
    const editorRange: Ref<EditorRange | null> = ref(null)

    const setupRef: SetupRef = {
      list,
      activeIndex,
      dropdownPos,
      isShowDropdown,
      editorValue,
      preventKeyUp,
      symbolsPolicy,
      editorRange
    }

    watch(
      () => props[isVue2 ? 'value' : 'modelValue'],
      newValue => {
        if (JSON.stringify(newValue) !== JSON.stringify(editorValue.value)) {
          nextTick(() => {
            initEditorEle({
              value: newValue,
              doc: window.document,
              that: currentInstance,
              setupRef
            })
          })
        }
      },
      {
        immediate: true
      }
    )

    watch(editorValue, newValue => {
      emit(isVue2 ? 'update' : 'update:modelValue', newValue)
    })

    const onKeyup = (e: Event) =>
      onInputText({
        e,
        that: currentInstance,
        win: window,
        props,
        setupRef
      })
    const onKeydown = (e: Event) =>
      onInputKeyDown({
        e,
        that: currentInstance,
        win: window,
        setupRef
      })
    const onBlur = () => onCloseDropdown(setupRef)
    const onMouseup = () =>
      doToggleDropdown({
        that: currentInstance,
        win: window,
        props,
        setupRef
      })
    const onPaste = (e: Event) =>
      doOnPaste({ e, that: currentInstance, win: window, setupRef })
    const onCompositionstart = () => console.log('正在输入中文')
    const compositionend = () =>
      onCompositionEnd({
        win: window,
        setupRef
      })

    let stopPreventMousedown: any
    if (withModifiers) {
      stopPreventMousedown = withModifiers(() => true, ['stop', 'prevent'])
    } else {
      stopPreventMousedown = (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
      }
    }

    const initEditor = () =>
      h('div', {
        ref: 'editorEle',
        props: {
          class: 'btp-textarea-symbol__editor'
        },

        attrs: { contenteditable: true },
        on: {
          keyup: onKeyup,
          keydown: onKeydown,
          blur: onBlur,
          mouseup: onMouseup,
          paste: onPaste,
          compositionstart: onCompositionstart,
          compositionend
        }
      })

    const initLi = () =>
      list.value.map((item, i) =>
        h(
          'li',
          {
            key: item.id,
            props: {
              class: ['btp-dropdown__item', { active: activeIndex.value == i }]
            },
            on: {
              mousedown: (e: Event) =>
                onLiMousedown({
                  e,
                  data: item,
                  that: currentInstance,
                  win: window,
                  setupRef
                })
            }
          },
          [
            h(
              item.componentName || 'span',
              item.componentProps || {},
              item.label
            )
          ]
        )
      )

    return () =>
      h(
        'div',
        {
          ref: 'symbolEditorEle',
          class: 'btp-textarea-symbol'
        },
        [
          initEditor(),
          h(
            'div',
            {
              ref: 'dropdownEle',
              class: 'btp-textarea-symbol__dropdown',
              style: [
                dropdownPos.value,
                { visibility: isShowDropdown.value ? 'visible' : 'hidden' }
              ],
              on: {
                mousedown: stopPreventMousedown
              }
            },
            [
              h('div', { class: 'btp-scrollbar' }, [
                h(
                  'div',
                  {
                    class: 'btp-scrollbar__wrap btp-dropdown__wrap'
                  },
                  [
                    h(
                      'ul',
                      {
                        class: 'btp-dropdown__list'
                      },
                      initLi()
                    )
                  ]
                )
              ])
            ]
          )
        ]
      )
  }
})

comp.initSymbolsPolicy = initSymbolsPolicy
export default comp
</script>

<style lang="scss">
.btp-textarea-symbol__editor {
  button {
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  button,
  button:hover {
    padding: 0.125rem;
    border: none;
    font-weight: 600;
    color: #409eff;
  }
}
</style>

<style lang="scss" scoped>
.btp-textarea-symbol {
  &__editor {
    background-color: #fff;
    background-image: none;
    border-radius: 0.25rem;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: auto;
    min-height: 40px;
    line-height: 1.5;
    outline: none;
    padding: 0.333rem 1rem;
    transition: rgb(118, 118, 118) 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    overflow-wrap: break-word;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
  }

  &__dropdown {
    position: absolute;
    z-index: 1001;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 5px 0;
  }
}

.btp-scrollbar {
  overflow: hidden;
  position: relative;
  &__wrap {
    overflow: auto;
    height: 100%;
  }
}
.btp-dropdown {
  &__wrap {
    max-height: 17.125rem;
  }
  &__list {
    list-style: none;
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box;
  }
  &__item {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;

    &.active,
    :hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
