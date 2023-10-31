<template>
  <div v-show="props.visible"
       class="m-dialog">
    <div class="m-dialog_main"
         :style="{ width: props.width + 'px' }">
      <div class="m-dialog_title">
        <template v-if="!props.header">
          <span class="tit">{{ props.title }}</span>
          <span class="close-icon el-icon-close"
                @click="hide"></span>
        </template>
        <slot v-else
              name="header"></slot>
      </div>
      <div class="m-dialog_body">
        <slot></slot>
      </div>
      <div v-if="props.footer"
           class="m-dialog_footer"
           :style="{ textAlign: footerBtnAlign }">
        <template v-if="!slots.footer">
          <el-button @click="hide">
            取消
          </el-button>
          <el-button type="primary"
                     :loading="props.loading"
                     @click="handleSubmit">
            确定
          </el-button>
        </template>
        <slot v-else
              name="footer"></slot>
      </div>
    </div>
    <div v-if="props.mask"
         class="m-dialog_mask"
         @click="maskClick"></div>
  </div>
</template>

<script setup lang="ts">
import { watch, useSlots } from 'vue'

interface Props {
  loading?: boolean
  visible?: boolean // dialog显示状态
  mask?: boolean //是否显示遮罩层
  width?: number // dialog宽度
  title?: string // dialogt标题
  header?: boolean // 是否自定义header
  footer?: boolean // 是否显示footer
  footerBtnAlign?: any // footer按钮对齐方式
  closeOnClickModal?: boolean //是否可以通过点击 modal 关闭 Dialog
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  visible: false,
  mask: true,
  width: 450,
  title: '提示',
  header: false,
  footer: true,
  footerBtnAlign: 'center',
  closeOnClickModal: true
})
const emits = defineEmits(['open', 'close', 'cancel', 'submitOk'])
const slots = useSlots()

watch(
  () => props.visible,
  (val) => {
    if (val) {
      emits('open')
    } else {
      emits('close')
    }
  },
  { immediate: true }
)

const maskClick = () => {
  if (props.closeOnClickModal) {
    emits('cancel')
  }
}
const hide = () => {
  emits('cancel')
}
const handleSubmit = () => {
  emits('submitOk')
}
</script>

<style scoped lang="less">
.m-dialog {
  position: relative;

  &_main {
    height: auto;
    display: flex;
    flex-flow: column nowrap;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -64%);
    background: #fff;
    .m-dialog_title {
      background: #fff;
      padding: 16px 20px 0 20px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      .tit {
        font-size: 18px;
        color: #303133;
      }
      .close-icon {
        font-size: 16px;
        color: #909399;
        cursor: pointer;
      }
    }
    .m-dialog_body {
      padding: 16px 20px;
      color: #606266;
      font-size: 14px;
      background: #fff;
      word-break: break-all;
    }
    .m-dialog_footer {
      background: #fff;
      padding: 0 20px 20px;
      text-align: center;
      box-sizing: border-box;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
  &_mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 900;
  }
}
</style>
