<template>
  <div class="head-box">
    <h3>MyBlog后台管理</h3>
    <div class="user-info">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            size="small"
            shape="square"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="user-name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu  class="select">
            <el-dropdown-item @click="handleExitClick"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item divided>用户管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStore } from '@/store/login/login'
import router from '@/router'
import localCache from '@/utils/cache'

const store = useLoginStore()

const name = computed(() => store.username)
const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="less">
.select {
  background-color: rgba(43, 44, 40, 0.6);
  .el-dropdown-menu__item{
    color: #fff;
  }
}
</style>
<style scoped lang="less">
.head-box {
  height: 45px;
  width: 100%;
  padding-left: 1vw;
  background-color: #414753;
  color: #fff;
  position: fixed;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .user-info {
    width: 160px;
    height: 100%;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      display: flex;
      align-items: center;

      .el-avatar {
        margin-right: 10px;
      }
      .user-name {
        color: #fff;
      }
    }
  }
}
</style>
