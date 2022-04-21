<template>
  <div ref="symbolEditorEle" class="btp-textarea-symbol">
    <div
      ref="editorEle"
      class="btp-textarea-symbol__editor"
      :contenteditable="true"
      @keyup="onInputText"
      @keydown="onInputKeyDown"
      @blur="onCloseDropdown"
      @mouseup="doToggleDropdown"
      @paste="doOnPaste"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    ></div>
    <div
      ref="dropdownEle"
      class="btp-textarea-symbol__dropdown"
      :style="[
        dropdownPos,
        { visibility: isShowDropdown ? 'visible' : 'hidden' }
      ]"
      @mousedown.stop.prevent
    >
      <div class="btp-scrollbar">
        <div class="btp-scrollbar__wrap btp-dropdown__wrap">
          <ul class="btp-dropdown__list">
            <li
              v-for="(item, i) in list"
              :key="item.id"
              class="btp-dropdown__item"
              :class="{ active: activeIndex == i }"
              @mousedown="e => onLiMousedown(e, item)"
            >
              <component
                :is="item.componentName"
                v-if="item.componentName"
                v-bind="item.componentProps"
              />
              <span v-else>{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

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

import { DropdownListItem } from './utils/type'

const comp = defineComponent({
  name: 'TextareaSymbol',
  props: {
    watchSymbolsPolicy: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  data() {
    const list: DropdownListItem[] = []

    return {
      list,
      activeIndex: 0,
      dropdownPos: {},
      isShowDropdown: false,
      editorValue: []
    }
  },
  watch: {
    modelValue: {
      handler(newValue) {
        // console.log('modelValue watch', newValue)

        if (JSON.stringify(newValue) !== JSON.stringify(this.editorValue)) {
          this.$nextTick(() => {
            initEditorEle(this as any, window.document)
          })
        }
      },
      immediate: true
    },
    editorValue: {
      handler(newValue) {
        this.$emit('update:modelValue', newValue)
      }
    }
  },

  methods: {
    doOnPaste(e: Event) {
      doOnPaste(e, this as any, window)
    },
    onLiMousedown(e: Event, data: DropdownListItem) {
      onLiMousedown({
        e,
        data,
        that: this as any,
        win: window
      })
    },
    onInputText(e: Event) {
      onInputText(e, this as any, window)
    },
    onInputKeyDown(e: Event) {
      onInputKeyDown({
        e,
        that: this as any,
        win: window
      })
    },
    onCloseDropdown() {
      onCloseDropdown(this as any)
    },
    doToggleDropdown() {
      doToggleDropdown(this as any, window)
    },
    onCompositionStart() {
      console.log('正在输入中文')
    },
    onCompositionEnd() {
      onCompositionEnd(this as any, window)
    }
  }
})

comp.initSymbolsPolicy = initSymbolsPolicy

export default comp
</script>

<style lang="scss">
.btp-textarea-symbol__editor {
  button,
  button:hover {
    padding: 0.125rem;
    border: none;
    font-weight: 600;
    color: #409eff;
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
