<!--
 * @Author: chenxin
 * @Date: 2023-06-20 10:31:04
 * @Description: 请填写简介
-->
<template>
  <div class="un-zip">
    <!-- 解压弹窗 -->
    <MDialog :title="state.titleNames[props.uploadStatus]"
             :visible="state.unzipDialog"
             :width="473"
             :footer="false"
             @cancel="hide">
      <el-progress v-if="props.uploadStatus == 'upload'"
                   :stroke-width="13"
                   :percentage="props.progress"></el-progress>
      <el-progress v-if="props.uploadStatus == 'unzip'"
                   :stroke-width="13"
                   :percentage="props.progress"></el-progress>
      <!-- 模拟了进度完成的事件 -->
      <div class="unzipDialogText">
        <p :title="props.zipName">
          {{ props.zipName }}
        </p>
        正在{{ state.titleNames[props.uploadStatus] }}中，请稍后～
      </div>
    </MDialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

export interface UnZipProps {
  zipName?: string
  uploadStatus?: string
  progress?: number
}

const props = withDefaults(defineProps<UnZipProps>(), {
  zipName: '',
  uploadStatus: 'upload',
  progress: 0
})

const state: { unzipDialog: boolean; titleNames: { [key: string]: any } } = reactive({
  unzipDialog: false,
  titleNames: { upload: '上传', unzip: '解压' }
})

const show = () => {
  state.unzipDialog = true
}
const hide = () => {
  state.unzipDialog = false
}
</script>
<style scoped lang="less">
.unzipDialogText {
  width: 100%;
  height: 24px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  text-align: center;
  margin-top: 14px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 210px;
  }
}
</style>
