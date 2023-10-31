<template>
  <el-popover popper-class="language-popper"
              v-bind="attrs"
              :visible="state.visible">
    <language-filter ref="languageFilterRef"
                     v-bind="attrs"
                     :model-value="props.modelValue"
                     @node-input="nodeInput"
                     @node-click="nodeClick"></language-filter>
    <template #reference>
      <div class="language-select-box">
        <slot v-if="slots.popoverTxt"
              name="popoverTxt"></slot>
        <div v-else
             class="lang-input"
             :class="{ 'is-focus': state.inputFocus }"
             @click="handleToggle">
          <div class="lang-val">
            <span v-if="!state.inputVal"
                  class="placeholder">{{ $t('common.text9') }}</span>
            <span v-else
                  class="select-val">{{ state.inputVal }}</span>
          </div>
          <div class="lang-icon">
            <el-icon :class="{ 'is-reverse': state.inputFocus }">
              <ArrowDown />
            </el-icon>
          </div>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { reactive, useAttrs, useSlots, ref } from 'vue'
import LanguageFilter from './LanguageFilter.vue'

const attrs: any = useAttrs()
const slots = useSlots()
const languageFilterRef = ref<InstanceType<typeof LanguageFilter> | null>(null)
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const state = reactive({
  inputFocus: false,
  inputVal: '',
  visible: false
})
const handleToggle = () => {
  state.visible = !state.visible
  if (state.visible) {
    languageFilterRef.value?.resetState()
    languageFilterRef.value?.scrollTop()
    state.inputFocus = true
  } else {
    state.inputFocus = false
  }
}
const handleHide = () => {
  state.visible = false
  state.inputFocus = false
}
const nodeInput = (item: any) => {
  handleHide()
  state.inputVal = item.langName
  emits('update:modelValue', item.langCode)
}
const nodeClick = (item: any) => {
  handleHide()
  state.inputVal = item.langName
  emits('update:modelValue', item.langCode)
  attrs.onChange?.(item.langCode, item)
}
</script>

<style scoped lang="less">
.language-select-box {
  width: 100%;
  .lang-input {
    width: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 1px 10px;
    display: flex;
    height: 32px;
    line-height: 32px;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;

    &:hover {
      border-color: #c0c4cc;
    }
    &.is-focus {
      border-color: #409eff;
    }
    .lang-val {
      flex: 1;
      width: 0;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .placeholder {
        color: #acaeb5;
      }
      .select-val {
        color: #606266;
      }
    }
    .lang-icon {
      height: 28px;
      text-align: right;
      width: 22px;
      color: #a8abb2;
      transition: all 0.3s;
      .el-icon {
        transform: rotateZ(0);
        transition: transform 0.3s;
        transform-origin: center;
        display: inline-block;
        &.is-reverse {
          transform: rotateZ(-180deg);
        }
      }
    }
  }
  .input-inner {
    padding: 0;
    outline: none;
    border: none;
    background: none;
    box-sizing: border-box;

    .el-icon {
      transform: rotateZ(0);
      transition: transform -3s;
      transform-origin: center;
      display: inline-block;
      &.is-reverse {
        transform: rotateZ(-180deg);
      }
    }
  }
}
</style>
