<template>
  <div class="manage-box">
    <nav-header></nav-header>
    <div class="main-box">
      <nav-menu></nav-menu>
      <router-view class="box"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavHeader from '@/components/nav-header.vue'
import NavMenu from '@/components/nav-menu.vue'
import { useLoginStore } from '@/store/login/login'
</script>

<style scoped lang="less">
.manage-box {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/img/meinv.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;
  .main-box {
    margin-top: 45px;
    height: calc(100vh - 45px);
    display: flex;
    // background-color: #000;
    .box {
      flex: 1;
      margin: 1vw;
      padding: 1vh;
      // background-color: #323232;
      border-radius: 5px;
    }
  }
}
</style>
