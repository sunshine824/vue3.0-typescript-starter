<template>
  <div class="page-view">
    <!-- 顶部导航 -->
    <div class="global-header">
      <GlobalHeader></GlobalHeader>
    </div>
    <!-- 主内容区 -->
    <div class="page-contanter">
      <RouterView></RouterView>
    </div>
    <!-- 底部公司信息 -->
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.page-view {
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  min-width: 1280px;
  overflow: auto;
  flex-flow: column nowrap;
  justify-content: space-between;
  .global-header {
    height: 56px;
    box-shadow: 0px 4px 20px 0px rgba(231, 219, 221, 0.6);
    background: #fff;
    position: fixed;
    z-index: 11;
    width: 100%;
  }

  .page-contanter {
    flex: 1;
    /*height: 0;*/
    position: relative;
    background: rgb(249, 249, 249);
    margin-top: 56px;
  }
}
</style>
