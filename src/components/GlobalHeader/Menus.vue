<template>
  <div class="menu-class">
    <el-menu :default-active="state.activeRoute"
             :mode="props.mode"
             text-color="#1b1b1b"
             active-text-color="#005eff"
             @select="handleMenuClick">
      <template v-for="menu in props.menuLists"
                :key="menu.path">
        <template v-if="!menu.children">
          <el-menu-item :index="menu.path">
            {{ menu.meta?.title }}
          </el-menu-item>
        </template>
        <template v-else>
          <SubMenus :menu="menu"></SubMenus>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { RouteRecordRaw, useRouter, useRoute } from 'vue-router'
import SubMenus from './SubMenus.vue'

interface Props {
  mode?: string
  menuLists: RouteRecordRaw[]
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'horizontal'
})

const route = useRoute()
const router = useRouter()
const state = reactive({
  activeRoute: ''
})

onMounted(() => {
  state.activeRoute = route.path as string
})

const handleMenuClick = (key: string, keyPath: string[]) => {
  router.push(key)
}
</script>

<style scoped lang="less">
.menu-class {
  flex: 1;
  width: 0;
  margin-left: 50px;
  margin-right: 20px;
  .el-menu {
    &.el-menu--horizontal {
      height: 56px;
      border-bottom: 0px;
      background: rgba(255, 255, 255, 0);
    }
    .el-menu-item {
      padding: 0 2px;
      margin-right: 40px;
      font-size: 15px;
      &:not(.is-disabled):focus,
      &:not(.is-disabled):hover {
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>
