<template>
  <div class="custom-file-upload"
       :style="{ width: $attrs.drag ? '100%' : 'auto' }">
    <!-- 拖拽模式 -->
    <div v-if="attrs.drag"
         class="upload-file"
         :style="{ borderColor: state.dragging ? props.borderActiveColor : props.borderColor }"
         @drop.stop.prevent="handleDrop"
         @dragover.stop.prevent="handleDragOver"
         @dragleave.stop.prevent="handleDragLeave">
      <div class="upload-box">
        <slot v-if="slots.uploadIcon"
              name="uploadIcon"></slot>
        <img v-else
             class="upload-icon"
             src="@/assets/imgs/upload-file.png" />
        <slot v-if="slots.uploadTitle"
              name="uploadTitle"></slot>
        <div v-else
             class="upload-txt"></div>
        <div class="upload-btn">
          <el-dropdown v-if="!attrs.simplyMode"
                       :disabled="attrs.disabled"
                       split-button
                       type="primary"
                       :class="{ 'btn-plain': attrs.plain }"
                       :style="attrs.buttonStyle"
                       @click="handleClickBtn"
                       @command="handleCommand">
            <div class="prefix-btn">
              {{ $t('common.text10') }}
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="props.fileTypes.includes('file')"
                                  command="file">
                  {{ $t('common.text11') }}
                </el-dropdown-item>
                <el-dropdown-item v-if="props.fileTypes.includes('folder')"
                                  command="folder">
                  {{ $t('common.text12') }}
                </el-dropdown-item>
                <el-dropdown-item v-if="props.fileTypes.includes('zip')"
                                  command="zip">
                  {{ $t('common.text13') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div v-else
               @click="handleClickBtn">
            <slot v-if="slots.uploadBtn"
                  name="uploadBtn"></slot>
            <el-button v-else
                       :disabled="attrs.disabled"
                       class="simply-btn"
                       type="primary">
              {{ $t('common.text10') }}
            </el-button>
          </div>
          <!-- 自定义额外操作按钮 -->
          <slot v-if="slots.customBtn"
                name="customBtn"></slot>
        </div>
        <slot v-if="slots.uploadTxt"
              name="uploadTxt"></slot>
        <div v-else
             class="upload-txt">
          {{ $t('common.text14') }}
        </div>
        <slot v-if="slots.tip"
              name="tip"></slot>
        <div v-else
             class="upload-accept">
          <span>{{ $t('common.text15') }}</span>
          <span>{{ $t('common.text16') }}</span>
          <span>{{ $t('common.text17') }}</span>
        </div>
      </div>
    </div>
    <!-- 普通按钮模式 -->
    <el-dropdown v-else-if="!attrs.simplyMode"
                 :disabled="attrs.disabled"
                 split-button
                 type="primary"
                 :class="{ 'btn-plain': attrs.plain }"
                 @click="handleClickBtn"
                 @command="handleCommand">
      <div class="prefix-btn">
        {{ attrs.uploadBtnTxt || $t('common.text10') }}
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="props.fileTypes.includes('file')"
                            command="file">
            {{ $t('common.text11') }}
          </el-dropdown-item>
          <el-dropdown-item v-if="props.fileTypes.includes('folder')"
                            command="folder">
            {{ $t('common.text12') }}
          </el-dropdown-item>
          <el-dropdown-item v-if="props.fileTypes.includes('zip')"
                            command="zip">
            {{ $t('common.text13') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div v-else>
      <slot v-if="slots.uploadBtn"
            name="uploadBtn"></slot>
      <el-button v-else
                 :disabled="attrs.disabled"
                 class="simply-btn"
                 type="primary"
                 @click="handleClickBtn">
        {{ attrs.uploadBtnTxt || $t('common.text10') }}
      </el-button>
    </div>

    <input ref="inputRef"
           type="file"
           style="display: none"
           :accept="state.uploadType == 'zip' ? '.zip' : ''"
           :webkitdirectory="state.uploadType == 'folder'"
           v-bind="attrs"
           @change="handleChangeFiles" />

    <!-- 解压弹窗 -->
    <UnZip ref="unzipDialog"
           :zip-name="state.zipName"
           :upload-status="state.zipUploadStatus"
           :progress="state.zipUploadProgress"></UnZip>
    <!-- 解压成功 -->
    <UnZipSuccess ref="unzipSuccessRef"
                  :unzip-files="state.unzipFiles"
                  @getAfterUnzipFiles="getAfterUnzipFiles"></UnZipSuccess>

    <!-- 解压失败 -->
    <UnZipFail ref="unzipFailRef"
               :zip-name="state.zipName"></UnZipFail>
  </div>
</template>

<script setup lang="ts">
import { uploadFileToUrl } from '@/utils/fetch'
import { uuid } from '@/utils/util'
import { useI18n } from 'vue-i18n'
import { CommonStore } from '@/store/modules/common'
import { FileFormatSupport, FileClassify } from '@/utils/const'
import CommonApi from '@/api/common'
import { reactive, useAttrs, watch, ref, useSlots, computed } from 'vue'
import { ElMessage } from 'element-plus'
import UnZip from './model/UnZip.vue'
import UnZipSuccess from './model/UnZipSuccess.vue'
import UnZipFail from './model/UnZipFail.vue'

export interface Props {
  data?: {
    projectId: string
    [key: string]: any
  }
  borderColor?: string
  borderActiveColor?: string
  accept?: string[]
  fileTypes?: string[]
  isStopUpload?: boolean
  [key: string]: any
}
export interface State {
  fileLists: File[]
  picFileLists: File[]
  voiceFileLists: File[]
  videoFileLists: File[]
  options: any
  [key: string]: any
}

const { t } = useI18n()
const attrs: any = useAttrs()
const slots = useSlots()
const commonStore = CommonStore()

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      projectId:''
    }
  },
  isStopUpload: false,
  accept: () => {
    return FileFormatSupport
  },
  fileTypes: () => {
    return ['file', 'folder', 'zip']
  },
  borderColor: '#c0c4cc',
  borderActiveColor: '#005eff'
})
const emit = defineEmits(['uploadBegin', 'onProgress', 'onFail'])

// input ref
const inputRef = ref()
const unzipDialogRef = ref()
const unzipFailRef = ref()
const unzipSuccessRef = ref()

// data define
const state: State = reactive({
  options: {
    // 单位M
    file: {
      fetchApi: CommonApi['getBleuUploadUrl'], // 请求接口
      data: {}, // 额外请求参数
      maxSize: 1000 // 文件大小
    },
    voice: {
      fetchApi: CommonApi['getVoiceUploadUrl'],
      data: {},
      maxSize: 4
    },
    video: {
      fetchApi: CommonApi['getVideoUploadUrl'],
      data: {},
      maxSize: 50
    },
    image: {
      fetchApi: CommonApi['getPicUploadUrl'],
      data: {},
      maxSize: 4
    },
    zip: {
      fetchApi: CommonApi['getZipUploadUrl'],
      data: {},
      maxSize: 30000
    }
  },
  zipName: '', // 上传zip名称
  fileLists: [], // 上传文件列表
  picFileLists: [], // 图标文件列表
  voiceFileLists: [], // 音频文件列表
  videoFileLists: [], // 视频文件列表
  dragging: false, // 拖拽状态
  uploadType: 'file', // 上传类型
  unzipFiles: {}, // zip解压列表
  zipUploadStatus: 'upload', // zip文件上传状态
  zipUploadProgress: 0, // zip上传进度
  unzipProgressTimer: null, // 模拟zip文件解压进度
  uploadBoxStyle: {
    width: attrs.drag ? '100%' : 'auto',
    height: attrs.drag ? '100%' : 'auto'
  },
  FileFormatSupport: FileFormatSupport,
  FileClassify: FileClassify
})

const socketId = computed(() => {
  return commonStore.getSocketId
})

watch(
  () => attrs.options,
  (value: object) => {
    if (value) {
      state.options = { ...state.options, ...value }
    }
  },
  { immediate: true }
)

// 获取文件分类
const getFileClassify = (suffix: string) => {
  let target = ''
  Object.keys(FileClassify).forEach((key) => {
    FileClassify[key].forEach((item) => {
      if (item.toLowerCase() == suffix.toLowerCase()) {
        target = key
      }
    })
  })
  return target
}

// 点击上传按钮
const handleClickBtn = () => {
  state.uploadType = 'file'
  inputRef['value'].value = ''
  let accept: string[] = JSON.parse(JSON.stringify(props.accept))
  if (state.uploadType !== 'zip') {
    accept = accept.filter((item) => item !== 'zip')
  }
  inputRef['value'].accept = '.' + accept.join(',.')
  inputRef['value'].multiple = attrs.multiple || false
  setTimeout(() => {
    inputRef['value'].click()
  }, 100)
}

// 点击菜单项触发的事件回调
const handleCommand = (type: string) => {
  state.uploadType = type
  inputRef['value'].value = ''
  if (type == 'zip') {
    inputRef['value'].multiple = false
    inputRef['value'].accept = '.zip,.pst'
  } else if (type == 'file') {
    inputRef['value'].multiple = attrs.multiple || false
    inputRef['value'].accept = '.' + props.accept.join(',.')
  } else {
    inputRef['value'].multiple = attrs.multiple || false
  }
  setTimeout(() => {
    inputRef['value']?.click()
  }, 100)
}

// 拖拽到上传区域
const handleDragOver = () => {
  if (attrs.disabled) return
  state.dragging = true
}
// 离开上传区域
const handleDragLeave = () => {
  if (attrs.disabled) return
  state.dragging = false
}
// 拖拽结束
const handleDrop = (e: any) => {
  if (attrs.disabled) return
  state.dragging = false
  // 可上传文件集合
  const dropFiles = []
  const df = e.dataTransfer
  // 过滤文件夹
  if (df.items !== undefined) {
    // Chrome有items属性，对Chrome的单独处理
    for (let i = 0; i < df.items.length; i++) {
      const item = df.items[i]
      const file = item.getAsFile()
      // 判断是否事文件
      if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
        dropFiles.push(file)
      } else {
        // 文件夹
        attrs.onAddFile?.({ guid: uuid(), name: file.name, size: file.size, progress: 100, message: t('common.text18'), status: 'error' })
        console.warn('error，不可以上传文件夹')
      }
    }
  } else {
    for (let i = 0; i < df.files.length; i++) {
      const file = df.files[i]
      if (file.type) {
        // 如果type不是空串，一定是文件
        dropFiles.push(file)
      } else {
        try {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file.slice(0, 3))
          fileReader.addEventListener(
            'load',
            (e) => {
              dropFiles.push(file)
            },
            false
          )
          fileReader.addEventListener(
            'error',
            (e) => {
              attrs.onAddFile?.({ guid: uuid(), name: file.name, size: file.size, progress: 100, message: t('common.text18'), status: 'error' })
              console.log(e, 'error，不可以上传文件夹')
            },
            false
          )
        } catch (e) {
          attrs.onAddFile?.({
            guid: uuid(),
            name: file.name,
            size: file.size,
            progress: 100,
            message: t('common.text18'),
            status: 'error'
          })
          console.log(e, 'catch error，不可以上传文件夹')
        }
      }
    }
  }
  if (dropFiles.length) {
    handleChangeFiles({
      target: { files: dropFiles }
    })
  }
}
// 文件状态改变时触发
const handleChangeFiles = async (e: any) => {
  let files = e.target.files
  // 获取支持的文件
  files = Object.values(files).filter((file: any) => {
    const data = checkFileFormat(file)
    if (data.status != 'ok') {
      attrs.onAddFile?.({
        guid: uuid(),
        name: file.name,
        size: file.size,
        progress: 100,
        message: data.message,
        status: 'error'
      })
    }
    return data.status == 'ok'
  })
  if (files.length) {
    // 上传文件之前的钩子
    await attrs.onBeforeUpload?.(files)
    // 是否终止上传
    if (props.isStopUpload) return
    state.picFileLists = []
    state.fileLists = []
    state.voiceFileLists = []
    state.videoFileLists = []
    // 文件分类
    files.forEach((file: File) => {
      const names = file.name.split('.')
      const suffix = names[names.length - 1]
      // 获取文件类型
      const fileType = getFileClassify(suffix)

      if (fileType == 'image') {
        // 图片文件列表
        state.picFileLists.push(file)
      } else if (fileType == 'voice') {
        state.voiceFileLists.push(file)
      } else if (fileType == 'video') {
        state.videoFileLists.push(file)
      } else {
        // 非图片文件列表
        state.fileLists.push(file)
      }
    })

    if (state.uploadType == 'zip') {
      // 获取zip上传地址
      getZipUploadUrl({
        names: JSON.stringify(getNames(state.fileLists))
      })
    } else {
      if (state.picFileLists.length) {
        // 获取图片上传地址
        getPicUploadUrl({
          names: JSON.stringify(getNames(state.picFileLists))
        })
      }
      if (state.fileLists.length) {
        // 获取非zip非图片上传地址
        getUploadUrl({
          names: JSON.stringify(getNames(state.fileLists))
        })
      }
      if (state.voiceFileLists.length) {
        // 获取音频上传地址
        getVoiceUploadUrl({
          names: JSON.stringify(getNames(state.voiceFileLists))
        })
      }
      if (state.videoFileLists.length) {
        // 获取视频上传地址
        getVideoUploadUrl({
          names: JSON.stringify(getNames(state.videoFileLists))
        })
      }
    }
  }
}
const getNames = (files: File[]) => {
  return files.map((item, index) => {
    return { name: item.name, size: item.size, customizeId: index }
  })
}
// 获取image第三方上传地址
const getPicUploadUrl = async (params = {}) => {
  // 判断是否有自定义上传方法
  if (attrs.onCustomPicFileFun) {
    attrs.onCustomPicFileFun(params)
    return
  }
  // 图片上传配置项
  const options = state.options['image'] || {}
  attrs.onUploadBegin?.({ message: t('common.text19'), type: 'image', status: 'before' })
  options['fetchApi']({ ...params, ...options.data }).then((res: any) => {
    const lists = res?.result?.docs || []
    if (lists.length) {
      lists.forEach((item: any) => {
        if (item.upload_url) {
          pushPicToUrl({ ...options['data'], ...item })
        }
      })
    }
  })
}
// 获取video第三方上传地址
const getVideoUploadUrl = async (params = {}) => {
  // 判断是否有自定义上传方法
  if (attrs.onCustomVideoFileFun) {
    attrs.onCustomVideoFileFun(params)
    return
  }
  // 音频上传配置项
  const options = state.options['video'] || {}
  attrs.onUploadBegin?.({ message: t('common.text20'), type: 'video', status: 'before' })
  options['fetchApi']({ ...params, ...options.data }).then((res: any) => {
    if (res && res.result && res.result.length) {
      res['result'].forEach((item: any) => {
        if (item.upload_url) {
          pushVideoToUrl({ ...options['data'], ...item })
        }
      })
    }
  })
}
// 获取voice第三方上传地址
const getVoiceUploadUrl = async (params = {}) => {
  // 判断是否有自定义上传方法
  if (attrs.onCustomVoiceFileFun) {
    attrs.onCustomVoiceFileFun(params)
    return
  }
  // 音频上传配置项
  const options = state.options['voice'] || {}
  attrs.onUploadBegin?.({ message: t('common.text21'), type: 'voice', status: 'before' })
  options['fetchApi']({ ...params, ...options.data }).then((res: any) => {
    if (res && res.result && res.result.length) {
      res['result'].forEach((item: any) => {
        if (item.upload_url) {
          pushVoiceToUrl({ ...options['data'], ...item })
        }
      })
    }
  })
}

// 获取zip第三方上传地址
const getZipUploadUrl = async (params = {}) => {
  // zip上传配置项
  const options = state.options['zip'] || {}
  attrs.onUploadBegin?.({ message: t('common.text22'), type: 'zip', status: 'before' })
  options['fetchApi']({ ...params, ...options['data'] }).then((res: any) => {
    if (res && res.result && res.result.length) {
      state.zipUploadStatus = 'upload'
      unzipDialogRef['value'].show()
      res['result'].forEach((item: any) => {
        state.zipName = item.name
        if (item.upload_url) {
          pushZipToUrl({ ...options['data'], ...item })
        }
      })
    } else {
      ElMessage.error(t('common.text23'))
    }
  })
}
// 获取第三方上传地址
const getUploadUrl = async (params = {}) => {
  // 判断是否有自定义上传方法
  if (attrs.onCustomFileFun) {
    attrs.onCustomFileFun?.(params, state.fileLists)
    return
  }
  // 文件上传配置项
  const options = state.options['file'] || {}
  emit('uploadBegin', {
    message: t('common.text24'),
    type: 'file',
    status: 'before'
  })
  options['fetchApi']({ ...params, ...options['data'] }).then((res: any) => {
    const lists = res?.result?.docs || []
    if (lists.length) {
      lists.forEach((item: any) => {
        // 推送文件到指定地址
        if (item.upload_url) {
          pushFileToUrl({ ...options['data'], ...item })
        } else {
          let message = t('common.text18')
          if (item.filePath == 'doc名字重复') {
            message = t('common.text25')
          }
          attrs.onAddFile?.({
            ...item,
            message,
            progress: 100,
            guid: uuid(),
            status: 'error'
          })
        }
      })
    }
  })
}

// 推送文件到指定地址
const pushFileToUrl = async (res: File) => {
  attrs.onAddFile?.({ ...res, message: t('common.text26'), status: 'waiting' })
  setTimeout(async () => {
    await uploadFileToUrl({
      url: res['upload_url'],
      file: state.fileLists[res['customizeId']],
      // 上传中进度
      progressCallBack: (progress) => {
        attrs.onProgress?.({
          ...res,
          progress,
          status: 'progress'
        })
        attrs.onAddFile?.({ ...res, message: t('common.text27'), progress, status: 'uploading' })
      },
      // 上传成功回调
      successCallBack: () => {
        attrs.onSuccess?.({ ...res, status: 'ok' })
        attrs.onAddFile?.({ ...res, message: t('common.text28'), progress: 100, status: 'queuing' })
      },
      // 上传失败回调
      failCallBack: (err) => {
        attrs.onFail?.({ status: 'error' })
        attrs.onAddFile?.({ ...res, message: t('common.text29'), progress: 100, status: 'error' })
      }
    })
  }, 100)
}

// 推送图片文件到指定地址
const pushPicToUrl = async (res: File) => {
  await uploadFileToUrl({
    url: res['upload_url'],
    file: state.picFileLists[res.customizeId],
    // 上传中进度
    progressCallBack: (progress) => {
      attrs.onProgress?.({
        ...res,
        progress,
        status: 'progress'
      })
    },
    // 上传成功回调
    successCallBack: () => {
      attrs.onSuccess?.({ ...res, status: 'ok' })
    },
    // 上传失败回调
    failCallBack: (err) => {
      attrs.onFail?.({ status: 'error' })
    }
  })
}

// 推送音频文件到指定地址
const pushVoiceToUrl = async (res: File) => {
  await uploadFileToUrl({
    url: res['upload_url'],
    file: state.voiceFileLists[res.customizeId],
    // 上传中进度
    progressCallBack: (progress) => {
      attrs.onProgress?.({ ...res, progress, status: 'progress' })
    },
    // 上传成功回调
    successCallBack: () => {
      attrs.onSuccess?.({ ...res, status: 'ok' })
    },
    // 上传失败回调
    failCallBack: (err) => {
      attrs.onFail?.({ status: 'error' })
    }
  })
}

// 推送视频文件到指定地址
const pushVideoToUrl = async (res: File) => {
  await uploadFileToUrl({
    url: res['upload_url'],
    file: state.videoFileLists[res.customizeId],
    // 上传中进度
    progressCallBack: (progress) => {
      attrs.onProgress?.({ ...res, progress, status: 'progress' })
    },
    // 上传成功回调
    successCallBack: () => {
      attrs.onSuccess?.({ ...res, status: 'ok' })
    },
    // 上传失败回调
    failCallBack: (err) => {
      attrs.onFail?.({ status: 'error' })
    }
  })
}

// 推送zip文件到指定地址
const pushZipToUrl = async (res: File) => {
  await uploadFileToUrl({
    url: res['upload_url'],
    file: state.fileLists[res.customizeId],
    // 上传中进度
    progressCallBack: (progress) => {
      state.zipUploadProgress = progress
    },
    // 上传成功回调
    successCallBack: () => {
      setTimeout(() => {
        state.zipUploadStatus = 'unzip'
        state.zipUploadProgress = 0
        getZipDocList(res)
        // 模拟zip解压进度
        mockZipProgress()
      }, 800)
    },
    // 上传失败回调
    failCallBack: (err) => {
      attrs.onFail?.({ status: 'error' })
    }
  })
}
// 模拟zip解压进度
const mockZipProgress = () => {
  const total = 2 * 60 * 1000 // 一分钟
  state.unzipProgressTimer = setInterval(() => {
    state.zipUploadProgress++
    if (state.zipUploadProgress >= 30) {
      clearInterval(state.unzipProgressTimer)
    }
  }, total / 30)
}
// 发起soctet，获取zip解压内容
const getZipDocList = async (res: File) => {
  // zip上传配置项
  const options = state.options['zip'] || {}
  const params = {
    zipPath: res.filePath,
    socketId: socketId['value'],
    ...options['data']
  }
  // socket返回结果
  await CommonApi.getZipDocList(params)
}
const getSocketData = (data: any) => {
  if ([48, 49].includes(data.type)) {
    getSocketUnzipFiles(data)
  }
}
// 接收socket推送zip解压数据
const getSocketUnzipFiles = (res: any) => {
  switch (res.type) {
    case 48:
      {
        if (res.code == 200) {
          if (res.result > 30) {
            clearInterval(state.unzipProgressTimer)
            state.zipUploadProgress = res.result ? Number(res.result) : 0
          }
        } else {
          unzipDialogRef['value'].hide()
          unzipFailRef['value'].show()
        }
      }
      break
    case 49:
      {
        setTimeout(() => {
          state.zipUploadProgress = 0
          state.zipUploadStatus = 'upload'
          unzipDialogRef['value'].hide()
          unzipSuccessRef['value'].show()
          state.unzipFiles = JSON.parse(res.result)
        }, 800)
      }
      break
    default:
      break
  }
}
// 上传解压列表的勾选文件
const getAfterUnzipFiles = async (fileList: File[]) => {
  // zip上传配置项
  const options = state.options['zip'] || {}
  fileList.forEach((item) => {
    item.projectId = props.data.projectId
  })
  const params = {
    names: JSON.stringify(fileList),
    ...options['data']
  }
  // 判断是否有自定义上传方法
  if (attrs.onCustomZipFileFun) {
    attrs.onCustomZipFileFun(params)
    return
  }
  const api = options['uploadApi'] || CommonApi.getZipUploadUrlList
  api(params).then((res: any) => {
    if (res) {
      res['result'].forEach((item: any) => {
        if (item.filePath == 'doc名字重复') {
          attrs.onAddFile?.({
            ...item,
            message: t('common.text25'),
            progress: 100,
            guid: uuid(),
            status: 'error'
          })
        } else {
          item.progress = 100
          attrs.onAddFile?.({
            ...item,
            message: t('common.text27'),
            status: 'uploading'
          })
          attrs.onSuccess?.({ ...item })
        }
      })
      unzipSuccessRef['value'].hide()
      state.uploadType = 'file'
    }
  })
}
// 验证文件格式
const checkFileFormat = (file: File) => {
  const names = file.name.split('.')
  const suffix = names[names.length - 1].toLowerCase()
  const fileType = getFileClassify(suffix)
  if (!props.accept.includes(suffix)) {
    return { message: t('common.text18'), status: 'error' }
  } else if (file.name.length > 200) {
    return { message: t('common.text30'), status: 'error' }
  } else if (file.size == 0) {
    return { message: t('common.text31'), status: 'error' }
  } else if (state.options[fileType].maxSize < file.size / 1024 / 1024) {
    return {
      message: `${t('common.text32')}${state.options[fileType].maxSize}M`,
      status: 'error'
    }
  }
  return { status: 'ok' }
}

defineExpose({
  handleClickBtn
})
</script>

<style lang="less" scoped>
.custom-file-upload {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  :deep(.el-button-group) {
    .el-button {
      padding: 10px 20px;
    }

    .el-dropdown__caret-button {
      padding-left: 5px;
      padding-right: 5px;
      height: 32px;
      outline: none;
    }

    .prefix-btn {
      min-width: 40px;
    }
  }

  .upload-file {
    width: 100%;
    height: 100%;
    border: 1px dashed rgba(0, 0, 0, 0);

    .upload-box {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .upload-icon {
        width: 30%;
        max-width: 350px;
      }

      .upload-btn {
        margin: 15px 0;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;

        .simply-btn {
          padding: 10px 20px;
          min-width: 85px;
        }
      }

      .upload-txt {
        font-size: 16px;
        color: #303133;
      }

      .upload-accept {
        background: #fafafa;
        padding: 12px 35px;
        display: flex;
        flex-flow: column;
        color: #606266;
        font-size: 12px;
        text-align: left;
        margin-top: 20px;

        span {
          margin-bottom: 6px;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          &::before {
            content: '';
            width: 4px;
            height: 4px;
            background: #dddddd;
            border-radius: 50%;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
