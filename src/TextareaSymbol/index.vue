<script lang="ts">
import {
  defineComponent,
  isVue2,
  getCurrentInstance,
  ref,
  watch,
  nextTick,
  Ref
} from 'vue-demi'

import demiH from '../utils/h-demi'

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

    const stopPreventMousedown = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
    }

    const liMousedown = (e: Event, item: any) =>
      onLiMousedown({
        e,
        data: item,
        that: currentInstance,
        win: window,
        setupRef
      })

    return {
      stopPreventMousedown,
      compositionend,
      onCompositionstart,
      onPaste,
      onMouseup,
      onBlur,
      onKeydown,
      onKeyup,
      liMousedown,
      dropdownPos,
      isShowDropdown,
      list,
      activeIndex
    }
  },
  render(createElement: any) {
    const h = isVue2 ? createElement : demiH

    const {
      stopPreventMousedown,
      compositionend,
      onCompositionstart,
      onPaste,
      onMouseup,
      onBlur,
      onKeydown,
      onKeyup,
      liMousedown,
      dropdownPos,
      isShowDropdown,
      list,
      activeIndex
    } = this

    const initEditor = () =>
      h('div', {
        ref: 'editorEle',
        class: 'btp-textarea-symbol__editor',

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
      list.map((item, i) =>
        h(
          'li',
          {
            key: item.id,
            class: ['btp-dropdown__item', { active: activeIndex == i }],
            on: {
              mousedown: (e: Event) => liMousedown(e, item)
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
    return h(
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
              dropdownPos,
              { display: isShowDropdown ? 'block' : 'none' }
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
.btp-textarea-symbol {
  &__editor {
    @apply bg-white bg-none rounded border border-solid border-gray-300 box-border text-gray-700 block h-auto px-2.5 py-2 w-full break-words;
    font-size: inherit;
    min-height: 40px;
    line-height: 1.5;
    // outline: none;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    button {
      @apply truncate inline-block;
      max-width: 10rem;
    }
    button,
    button:hover {
      @apply p-1 border-0 font-semibold;
      color: #409eff;
    }
  }

  &__dropdown {
    @apply absolute border border-solid border-gray-300 rounded-sm bg-white box-border my-1 shadow;
    z-index: 1001;
  }

  .btp-scrollbar {
    @apply overflow-hidden relative;
    &__wrap {
      @apply overflow-auto h-full;
    }
  }
  .btp-dropdown {
    &__wrap {
      max-height: 17.125rem;
    }
    &__list {
      @apply list-none py-1.5 px-0 m-0 box-border;
    }
    &__item {
      @apply text-sm py-0 px-5 relative truncate text-gray-600 box-border cursor-pointer leading-9;

      &.active,
      :hover {
        @apply bg-gray-100;
      }
    }
  }
}
</style>
