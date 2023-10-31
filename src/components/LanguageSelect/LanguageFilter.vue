<template>
  <div class="language-filter">
    <el-input v-model="state.searchVal"
              :placeholder="$t('common.text7')"
              class="input-search"
              @focus="handleFocus"
              @input="searchChange">
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
    <div v-if="!state.searchVal"
         class="language-box">
      <div ref="languageBoxRef"
           class="language-lists"
           @mousedown.prevent="chooseLang">
        <div class="language-item">
          <p class="language-txt">
            {{ $t('common.text8') }}
          </p>
          <span v-for="item in filterCommonLang"
                :key="item.id"
                :data-key="item.langCode"
                class="lang-item">{{ item.langName }}</span>
        </div>
        <div v-for="(langs, key) in props.data"
             :key="key"
             class="language-item">
          <p class="language-txt"
             :data-letter="key">
            {{ key }}
          </p>
          <span v-for="item in langs"
                :key="item.id"
                :data-key="item.langCode"
                class="lang-item">{{ item.langName }}</span>
        </div>
      </div>
      <div class="language-letter"
           @mousedown.prevent="locationLetter">
        <span v-for="item in letters"
              :key="item"
              :data-key="item"
              class="letter-item">{{ item }}</span>
      </div>
    </div>
    <div v-else
         class="search-result"
         @mousedown.prevent="chooseLang">
      <span v-for="item in state.searchResult"
            :key="item.id"
            :data-key="item.langCode"
            class="result-item">{{ item.langName }}&nbsp;&nbsp;{{ item.langCode }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref, nextTick } from 'vue'

interface LangItem {
  dictionaryCode: string
  id: number
  langCode: string
  langName: string
  langPinyin: string
}
interface Props {
  modelValue: string
  data?: { [key: string]: LangItem[] }
  isShowAuto?: boolean
  commonLang?: LangItem[]
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  data: () => {
    return {}
  },
  isShowAuto: false,
  commonLang: () => {
    return [
      {
        langName: '自动检测',
        dictionaryCode: 'LANGUAGE',
        langCode: 'auto',
        id: 10000,
        langPinyin: 'zi dong jian ce'
      },
      {
        langName: '英语',
        dictionaryCode: 'LANGUAGE',
        id: 10001,
        langCode: 'en',
        langPinyin: 'ying wen'
      },
      {
        langName: '日语',
        dictionaryCode: 'LANGUAGE',
        id: 10008,
        langCode: 'ja',
        langPinyin: 'ri yu'
      },
      {
        langName: '韩语',
        dictionaryCode: 'LANGUAGE',
        id: 10009,
        langCode: 'ko',
        langPinyin: 'han yu'
      },
      {
        langName: '简体中文',
        dictionaryCode: 'LANGUAGE',
        id: 10002,
        langCode: 'zh-cn',
        langPinyin: 'jian ti zhong wen'
      },
      {
        langName: '法语',
        dictionaryCode: 'LANGUAGE',
        id: 10006,
        langCode: 'fr',
        langPinyin: 'fa yu'
      }
    ]
  }
})
const languageBoxRef: any = ref()
const emits = defineEmits(['node-click', 'search-input-focus', 'node-input'])

const state: { searchVal: string; searchResult: LangItem[] } = reactive({
  searchVal: '',
  searchResult: []
})

const letters = computed(() => {
  return Object.keys(props.data as { [key: string]: LangItem[] })
})
const allLangs = computed(() => {
  const allLangs = Object.values(props.data as { [key: string]: LangItem[] }).flat()
  if (props.isShowAuto) {
    return [...allLangs, { langName: '自动检测', dictionaryCode: 'LANGUAGE', langCode: 'auto', id: 10000, langPinyin: 'zi dong jian ce' }]
  }
  return allLangs
})
const chooseLang = (e: any) => {
  const key = e.target.dataset['key']
  if (key) {
    const data = allLangs['value'].find((item) => {
      return item.langCode == key
    })
    if (data) { 
      emits('node-click', data)
    }
  }
}
const locationLetter = (e: any) => {
  const key = e.target.dataset['key']
  if (key) {
    const elem: HTMLElement = languageBoxRef['value']?.querySelector(`.language-txt[data-letter='${key}']`)
    languageBoxRef['value'].scrollTop = elem?.offsetTop || 0
  }
}
const getLangByKey = (key: string) => {
  const data = allLangs['value'].find((item) => {
    return item.langCode == key
  })
  if (data) {
    emits('node-input', data)
  }
}
// 常用语言
const filterCommonLang = computed(() => {
  if (!props.isShowAuto) {
    return props.commonLang.filter((item) => item.langCode !== 'auto')
  }
  return props.commonLang
})
// 搜索词
const searchChange = (val: string) => {
  state.searchResult = allLangs['value'].filter((item: LangItem) => {
    return item.langName.includes(val) || item.langCode.includes(val.toLowerCase()) || item.langPinyin.slice(0, 1).includes(val.toLowerCase())
  })
}
const handleFocus = () => {
  emits('search-input-focus')
}

const resetState = () => {
  state.searchResult = []
  state.searchVal = ''
}

const scrollTop = () => {
  nextTick(() => {
    languageBoxRef['value'].scrollTop = 0
  })
}

watch(
  () => props.data,
  (val) => {
    getLangByKey(props.modelValue)
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (val) => {
    getLangByKey(val)
  }
)

defineExpose({
  resetState,
  scrollTop
})
</script>

<style scoped lang="less">
.language-filter {
  margin-right: -12px;
  .input-search {
    border: none;
    width: calc(100% - 40px);
    :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .language-box {
    display: flex;
    flex-flow: row nowrap;
    .language-lists {
      display: flex;
      flex-flow: column;
      width: calc(100% - 40px);
      height: 460px;
      overflow-y: auto;
      margin-top: 10px;
      position: relative;
      .language-item {
        margin-bottom: 10px;
        .language-txt {
          font-size: 13px;
          color: #666666;
          margin-bottom: 4px;
        }
        .lang-item {
          display: inline-block;
          height: 22px;
          width: 140px;
          line-height: 22px;
          color: rgb(27, 27, 27);
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    .language-letter {
      display: flex;
      flex-flow: column;
      width: 40px;
      text-align: center;
      .letter-item {
        height: 25px;
        line-height: 20px;
        font-size: 13px;
        color: #acacac;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
    }
  }
  .search-result {
    margin-top: 10px;
    display: flex;
    flex-flow: column;
    height: 460px;
    overflow-y: auto;
    .result-item {
      margin: 2px 20px 2px 0;
      height: 22px;
      font-size: 12px;
      line-height: 22px;
      cursor: pointer;
      &:hover {
        background: #eef4ff;
      }
    }
  }
}
</style>
