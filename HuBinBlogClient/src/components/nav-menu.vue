<template>
  <el-menu
    router
    :default-active="$route.path"
    class="menu"
    background-color="rgba(43, 44, 40, 0.6)"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/main/analysis/article-analysis">
      <el-icon><HomeFilled /></el-icon>
      <span slot="title">数据看板</span>
    </el-menu-item>
    <el-menu-item index="/main/article/category">
			<el-icon><Document /></el-icon>
			<span slot="title">文章分类</span>
		</el-menu-item>
		<el-menu-item index="/main/article/list">
			<el-icon><List /></el-icon>
			<span slot="title">文章列表</span>
		</el-menu-item>
		<el-menu-item index="/main/user/user-info">
			<el-icon><User /></el-icon>
			<span slot="title">用户管理</span>
		</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts"></script>

<style scoped></style>
