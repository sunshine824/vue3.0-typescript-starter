<template>
  <div class="choose-dialog-file">
    <MDialog title="选择文件"
             :width="640"
             :visible="state.unzipSuccessDialog"
             @cancel="hide">
      <span>共成功解压出{{ props.unzipFiles.successNum }}个文件，{{ props.unzipFiles.failedNum }}个失败。平台可支持的文件共{{ props.unzipFiles.supportNum }}个，请选择本次需上传的文件：</span>
      <div class="unzipSuccess">
        <div class="unzip-lists">
          <el-table ref="multipleTable"
                    :data="props.unzipFiles.docs"
                    :max-height="340"
                    tooltip-effect="dark"
                    :show-header="false"
                    stripe
                    @selection-change="handleSelectionChange">
            <el-table-column :selectable="checkSelectable"
                             type="selection"
                             width="55"></el-table-column>
            <el-table-column>
              <template #default="scope">
                <div class="file-box">
                  <span class="file-icon"
                        v-html="getDocTypeIcon(scope.row.name)"></span>
                  <span>{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin: 15px 0 0 13px; text-align: left">
          <el-checkbox v-model="state.checkAll"
                       style="margin-right: 20px"
                       @change="allSelected">
            全选
          </el-checkbox>
          <span>已选{{ state.multipleSelection.length }}个</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="hide">
            取 消
          </el-button>
          <el-button :loading="state.loading"
                     :disabled="!state.multipleSelection.length"
                     type="primary"
                     @click="choiceUploadFiles">
            确 定
          </el-button>
        </div>
      </template>
    </MDialog>
  </div>
</template>
<script setup lang="ts">
import { getDocTypeIcon } from '@/utils/util'
import { reactive, ref, watch } from 'vue'

export interface UnZipSuccProps {
  unzipFiles?: {
    successNum: number
    supportNum: number
    failedNum: number
    docs: { [key: string]: any }
  }
}

const props = withDefaults(defineProps<UnZipSuccProps>(), {
  unzipFiles: () => {
    return { successNum: 0, failedNum: 0, supportNum: 0, docs: [] }
  }
})
const emits = defineEmits(['getAfterUnzipFiles'])

const multipleTableRef = ref()
const state: { [key: string]: any } = reactive({
  unzipSuccessDialog: false,
  multipleSelection: [],
  checkAll: false,
  loading: false
})

const show = () => {
  state.unzipSuccessDialog = true
  multipleTableRef['value'].toggleAllSelection()
}
const hide = () => {
  state.loading = false
  state.unzipSuccessDialog = false
}
// 是否禁用
const checkSelectable = (row: any) => {
  return row.support
}
const handleSelectionChange = (val: any) => {
  state.multipleSelection = val
}
const allSelected = (e: any) => {
  state.checkAll = e
  if (state.checkAll) {
    multipleTableRef['value'].toggleAllSelection()
  } else {
    multipleTableRef['value'].clearSelection()
  }
}
const choiceUploadFiles = () => {
  state.multipleSelection.map((item: any, index: number) => {
    return (item.customizeId = index)
  })
  state.loading = true
  emits('getAfterUnzipFiles', state.multipleSelection)
}

watch(
  () => state.multipleSelection,
  (val) => {
    const supportFiles = props.unzipFiles['docs'].filter((item: any) => item.support)
    if (val.length == supportFiles.length) {
      state.checkAll = true
    } else {
      state.checkAll = false
    }
  }
)
</script>
<style scoped lang="less">
.choose-dialog-file {
  .el-table__empty-block {
    width: 100% !important;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .unzipSuccess {
    min-height: 67px;
    margin-top: 15px;
    .unzip-lists {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      .file-box {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .file-icon {
          font-size: 40px;
          margin-right: 15px;
        }
      }
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
