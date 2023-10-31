<template>
  <div class="unzip-dialog-file">
    <MDialog title="解压"
             :footer="false"
             :visible="state.unzipFailDialog"
             :width="473"
             @cancel="hide">
      <div class="deleteDialog">
        <span class="el-icon-error icon-error"></span>
        <div class="text">
          <p :title="props.zipName">
            {{ props.zipName }}
          </p>
          解压失败，请检查文件后再试。
        </div>
      </div>
    </MDialog>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

export interface UnZipFailProps {
  zipName?: string
}

const props = withDefaults(defineProps<UnZipFailProps>(), {
  zipName: ''
})
const state = reactive({
  unzipFailDialog: false
})
const show = async () => {
  state.unzipFailDialog = true
}
const hide = async () => {
  state.unzipFailDialog = false
}
</script>
<style scoped lang="less">
.deleteDialog {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  .icon-error {
    font-size: 22px;
    color: #fb3f58;
  }
  .text {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: #666;
    line-height: 24px;
    margin-left: 13px;
    flex: 1;
    width: 0;
    display: flex;
    flex-flow: row nowrap;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 200px;
    }
  }
}
</style>
