<template>
  <div>
    <el-config-provider :locale="zhCn">
      <meting-js
        server="tencent"
        type="playlist"
        id="2169086776"
        fixed="true"
        autoplay="true"
        loop="all"
        order="list"
        preload="auto"
        list-folded="true"
        list-max-height="500px"
        lrc-type="1"
      >
      </meting-js>
      <router-view></router-view
    ></el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style scoped></style>
