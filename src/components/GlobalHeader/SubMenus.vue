<template>
  <el-sub-menu popper-class="sub-menu-popper"
               :index="props.menu.path">
    <template #title>
      <span>{{ props.menu.meta?.title }}</span>
    </template>
    <template v-for="item in props.menu.children"
              :key="item.path">
      <template v-if="!item.children">
        <el-menu-item :index="item.path">
          {{ item.meta?.title }}
        </el-menu-item>
      </template>
      <template v-else>
        <SubMenus :menu="item"></SubMenus>
      </template>
    </template>
  </el-sub-menu>
</template>

<script setup name="SubMenus" lang="ts">
import { RouteRecordRaw } from 'vue-router'

interface Props {
  menu: RouteRecordRaw
}
const props = defineProps<Props>()
</script>

<style lang="less">
.sub-menu-popper {
  border-bottom: 0px;
  &.is-light {
    border: none;
  }
  .el-menu--popup {
    min-width: 200px;
    border: none;
    padding: 5px 0;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
    .el-menu-item {
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      &:hover {
        color: #005eff;
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }
}
</style>
