<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/img/yksg.svg" class="logo-img" />
      <p class="logo-name">斌斌博客</p>
    </div>
    <div class="menu">
      <el-button link @click="articleBtn">博客</el-button>
      <el-button link @click="messageBtn">留言墙</el-button>
      <el-button link @click="photoBtn">相片</el-button>
      <el-button link @click="videoBtn">视频</el-button>
      <el-button link @click="adminBtn">后台管理</el-button>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const adminBtn = () => {
  router.push('/main')
}

const messageBtn = () => {
  router.push('/home/wallmessage')
}

const articleBtn = () => {
  router.push('/home/article')
}
const photoBtn = () => {
  router.push('/home/photo')
}
const videoBtn = () => {
  router.push('/home/video')
}
</script>

<style scoped lang="less">
.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  .logo {
    width: 200px;
    display: flex;
    align-items: center;
    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }
  }
}
.menu {
  .menu-message {
    margin-right: 24px;
  }
}
.user {
  width: 200px;
  .user-head {
    float: right;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    background-image: linear-gradient(180deg, #7be7ff 2%, #1e85e2 100%);
  }
}
</style>
