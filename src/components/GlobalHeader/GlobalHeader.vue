<template>
  <div class="header-middle">
    <div class="menu-left">
      <img class="logo-img"
           src="@/assets/imgs/logo.png"
           @click="toHome" />
      <span v-show="state.soloModuleName"
            class="current-module">{{ state.soloModuleName }}</span>
      <Menus v-show="!state.soloModuleName"
             :menu-lists="menuLists"></Menus>
    </div>
    <div class="menu-right">
      <el-dropdown popper-class="drop-down-popper"
                   @command="switchLang">
        <img class="language-icon"
             src="@/assets/imgs/language-icon.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in langList"
                              :key="item.value"
                              :class="{ active: item.value == currentLang }"
                              :command="item.value">
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 登录&注册 -->
      <div v-if="!isLogin"
           class="user-action">
        <el-button @click="router.push('/register')">
          {{ $t('common.text2') }}
        </el-button>
        <el-button type="primary"
                   @click="router.push('/login')">
          {{ $t('common.text1') }}
        </el-button>
      </div>
      <!-- 已登录状态 -->
      <el-dropdown v-else
                   popper-class="drop-down-popper"
                   @command="handleCommand">
        <div class="user-info">
          <img class="user-img"
               src="@/assets/imgs/user.png" />
          <el-icon>
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="account">
              {{ $t('common.text15') }}
            </el-dropdown-item>
            <el-dropdown-item command="exit">
              {{ $t('common.text16') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, inject, ref } from 'vue'
import { CommonStore } from '@/store/modules/common'
import { MenuBlackList } from '@/utils/const'
import LangList from '@/i18n/lang-list'
import { RouteRecordRaw, useRouter, useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from 'vue-router'
import Menus from './Menus.vue'
import to from 'await-to-js'

const common = CommonStore()
const router = useRouter()
const route = useRoute()
const langList = LangList
const changeLang: any = inject('changeLang')
const currentLang = ref('')

const state = reactive({
  soloModuleName: ''
})

onMounted(() => {
  updateSoloModuleName(route)
  currentLang['value'] = localStorage.getItem('languageKey') as string
})

// 判断是否登录
const isLogin = computed(() => {
  const keys = Object.keys(common.getLoginInfo)
  return keys.length ? true : false
})

// 获取显示状态的路由
const menuLists = computed(() => {
  const menus = getMenus().filter((item: any) => !item?.meta?.hidden)
  return menus
})

const switchLang = (key: string) => {
  changeLang(key)
  currentLang['value'] = key
}

const toHome = () => {
  router.push('/home')
}

// 获取路由列表
const getMenus = () => {
  let menuList: RouteRecordRaw[] = []
  const routes: any = router.options?.routes || []
  routes.some((item: any) => {
    if (item.path == '/') {
      menuList = item.children || []
      return true
    }
  })
  return JSON.parse(JSON.stringify(menuList))
}

// action点击
const handleCommand = (command: string) => {
  switch (command) {
    case 'order':
      // window.history.pushState({}, '', '/client/order')
      window.location.href = '/client/orderCenter'
      break
    case 'wallet':
      window.location.href = '/client/myWallet'
      break
    case 'account':
      window.location.href = '/client/accountSecurity'
      break
    case 'exit':
      handleExit()
      break
    default:
      break
  }
}

// 退出登录
const handleExit = async () => {
  console.log('退出登录')
}

const updateSoloModuleName = (data: RouteLocationNormalizedLoaded) => {
  if (data.meta?.hidden && !MenuBlackList.includes(data.path as never)) {
    state.soloModuleName = data.meta?.title as string
  }
}

onBeforeRouteUpdate((to) => {
  updateSoloModuleName(to)
})
</script>

<style lang="less">
.drop-down-popper {
  .el-dropdown__list {
    .el-dropdown-menu__item {
      font-size: 12px;
      &.active {
        color: #409eff;
      }
    }
  }
}
</style>
<style scoped lang="less">
.header-middle {
  height: 100%;
  width: 100%;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
  z-index: 111;
  padding: 0 20px;

  .menu-left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    width: 0;

    .logo-img {
      height: 50px;
      cursor: pointer;

      img {
        width: auto;
        height: 100%;
      }
    }

    .current-module {
      color: #353535;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-left: 50px;

      &::before {
        content: '';
        width: 3px;
        height: 18px;
        background: #fb3f58;
        margin-right: 5px;
      }
    }
  }

  .menu-right {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .language-icon {
      width: 26px;
      cursor: pointer;
    }

    .serve-guide {
      font-size: 15px;
      color: #1b1b1b;
      position: relative;
      cursor: pointer;

      .sign {
        position: absolute;
        background: linear-gradient(225deg, #f65454 1%, #feb362);
        border-radius: 9px 7px 7px 0px;
        color: #fff;
        font-size: 11px;
        font-weight: 400;
        padding: 0 3px 0 5px;
        top: -14px;
        right: -5px;
        height: 16px;

        .sign-txt {
          display: inline-block;
          transform: scale(0.8);
        }
      }
    }

    .customer {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 15px;
      color: #1b1b1b;
      margin-left: 26px;
      cursor: pointer;

      &-img {
        width: 24px;
        height: 24px;
        margin-right: 6px;
      }
    }

    .user-action {
      margin-left: 25px;
    }

    .user-info {
      margin-left: 20px;
      display: flex;
      align-items: center;
      outline: none;

      .user-img {
        width: 32px;
        height: 32px;
        margin-right: 4px;
      }
    }
  }
}
</style>
